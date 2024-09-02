from flask import Blueprint, request
import numpy as np
import math
from faunadb import query as q
import joblib
from config import client

strokes_bp = Blueprint("strokes", __name__, url_prefix="/strokes")

imported_model = joblib.load("./models/rf_classifier_model_4.joblib")


def euclidean_distance(point1, point2):
    return np.sqrt((point2["x"] - point1["x"]) ** 2 + (point2["y"] - point1["y"]) ** 2)


def euclidean_distance_abs(point1, point2):
    return abs(euclidean_distance(point1, point2))


def mean(numbers):
    if len(numbers) == 0:
        return None
    return sum(numbers) / len(numbers)


def standard_deviation(numbers):
    if len(numbers) == 0:
        return None  # To handle the case of an empty list

    mean_value = mean(numbers)

    # Calculate the squared differences from the mean
    squared_diffs = [(x - mean_value) ** 2 for x in numbers]

    # Calculate the variance
    variance = sum(squared_diffs) / len(numbers)

    # Calculate the standard deviation as the square root of the variance
    std_dev = math.sqrt(variance)

    return std_dev


def get_statistics(numbers):
    min_val = min(numbers)
    max_val = max(numbers)

    return {
        "min": min_val,
        "max": max_val,
        "mean": mean(numbers),
        "standard_deviation": standard_deviation(numbers),
        "min_max_difference": max_val - min_val,
    }


def process_stroke(events):
    # timestamps
    init_timestamp = events[0]["timestamp"]
    timestamps = [(row["timestamp"] - init_timestamp) for row in events]

    # X-axis positions
    x_values = [row["x"] for row in events]

    # Y-axis positions
    y_values = [row["y"] for row in events]

    # ----- linear space interpolation -----
    interpolated_timestamps = np.arange(min(timestamps), max(timestamps) + 1)
    interpolated_x = np.interp(interpolated_timestamps, timestamps, x_values)
    interpolated_y = np.interp(interpolated_timestamps, timestamps, y_values)

    interpolated_data = [
        {"x": int(x), "y": int(y), "timestamp": int(timestamp)}
        for x, y, timestamp in zip(
            interpolated_x, interpolated_y, interpolated_timestamps
        )
    ]

    # ----- Euclidean distance between two consecutive points -----

    cumulative_sum = 0

    distances = [0]
    distances_x = [0]
    distances_y = [0]

    for i in range(len(events) - 1):
        distance = euclidean_distance_abs(events[i], events[i + 1])
        distances.append(distance)
        cumulative_sum += distance

        distance_x = abs(events[i + 1]["x"] - events[i]["x"])
        distances_x.append(distance_x)

        distance_y = abs(events[i + 1]["y"] - events[i]["y"])
        distances_y.append(distance_y)

    # ----- Cumulative sum for interpolated data -----

    cumulative_sum_interpolated = 0

    x_axis_angles_accumulated = [0]
    curvatures = [0]
    curvatures_square = [0]
    accumulated_angles = 0

    for i in range(len(interpolated_data) - 1):
        distance_abs = euclidean_distance_abs(
            interpolated_data[i], interpolated_data[i + 1]
        )

        cumulative_sum_interpolated += distance_abs

        distance_x = interpolated_data[i + 1]["x"] - interpolated_data[i]["x"]
        distance_y = interpolated_data[i + 1]["y"] - interpolated_data[i]["y"]

        x_axis_angle = math.atan2(distance_y, distance_x)
        accumulated_angles += x_axis_angle

        x_axis_angles_accumulated.append(accumulated_angles)

        curvature = x_axis_angle / distance if distance != 0 else 0
        curvatures.append(curvature)
        curvature_square = curvature / distance if curvature != 0 else 0
        curvatures_square.append(curvature_square)

    # ----- Velocities -----

    initial_velocities_x = []
    initial_velocities_y = []

    final_velocities_x = []
    final_velocities_y = []

    velocities_timestamps = []

    for i in range(1, len(events) - 1):
        velocities_timestamps.append(timestamps[i])

        # initial velociteis
        vx_i = abs((events[i]["x"] - events[i - 1]["x"])) / (
            events[i]["timestamp"] - events[i - 1]["timestamp"]
        )
        initial_velocities_x.append(vx_i)

        vy_i = abs((events[i]["y"] - events[i - 1]["y"])) / (
            events[i]["timestamp"] - events[i - 1]["timestamp"]
        )
        initial_velocities_y.append(vy_i)

        # final velocities
        vx_f = abs((events[i + 1]["x"] - events[i]["x"])) / (
            events[i + 1]["timestamp"] - events[i]["timestamp"]
        )
        final_velocities_x.append(vx_f)

        vy_f = abs((events[i + 1]["y"] - events[i]["y"])) / (
            events[i + 1]["timestamp"] - events[i]["timestamp"]
        )
        final_velocities_y.append(vy_f)

    # ----- Acceleration -----

    accelerations_x = []
    accelerations_y = []

    for i in range(len(initial_velocities_x)):
        ax = abs(
            (final_velocities_x[i] - initial_velocities_x[i])
            / (events[i]["timestamp"] - events[i - 1]["timestamp"])
        )
        accelerations_x.append(ax)

        ay = abs(
            (final_velocities_y[i] - initial_velocities_y[i])
            / (events[i]["timestamp"] - events[i - 1]["timestamp"])
        )
        accelerations_y.append(ay)

    # ----- Straightness ----

    straightness = (euclidean_distance_abs(events[0], events[-1])) / cumulative_sum

    #  ----- Jitter -----

    jitter = cumulative_sum_interpolated / cumulative_sum

    # ----- Number of pauses -----

    pauses_num = 0

    for i in range(len(events) - 1):
        if events[i + 1]["timestamp"] - events[i]["timestamp"] > 100:
            pauses_num += 1

    # ----- Feature generation -----

    vel_x_stats = get_statistics(initial_velocities_x)
    vel_y_stats = get_statistics(initial_velocities_y)
    accelerations_x = get_statistics(accelerations_x)
    accelerations_y = get_statistics(accelerations_y)
    x_axis_angles_stats = get_statistics(x_axis_angles_accumulated)
    curvatures_stats = get_statistics(curvatures)
    curvatures_square_stats = get_statistics(curvatures_square)

    combined_stats = {
        "velocity_x_min": vel_x_stats["min"],
        "velocity_x_max": vel_x_stats["max"],
        "velocity_x_mean": vel_x_stats["mean"],
        "velocity_x_standard_deviation": vel_x_stats["standard_deviation"],
        "velocity_x_min_max_difference": vel_x_stats["min_max_difference"],
        "velocity_y_min": vel_y_stats["min"],
        "velocity_y_max": vel_y_stats["max"],
        "velocity_y_mean": vel_y_stats["mean"],
        "velocity_y_standard_deviation": vel_y_stats["standard_deviation"],
        "velocity_y_min_max_difference": vel_y_stats["min_max_difference"],
        "accelerations_x_min": accelerations_x["min"],
        "accelerations_x_max": accelerations_x["max"],
        "accelerations_x_mean": accelerations_x["mean"],
        "accelerations_x_standard_deviation": accelerations_x["standard_deviation"],
        "accelerations_x_min_max_difference": accelerations_x["min_max_difference"],
        "accelerations_y_min": accelerations_y["min"],
        "accelerations_y_max": accelerations_y["max"],
        "accelerations_y_mean": accelerations_y["mean"],
        "accelerations_y_standard_deviation": accelerations_y["standard_deviation"],
        "accelerations_y_min_max_difference": accelerations_y["min_max_difference"],
        "x_axis_angles_min": x_axis_angles_stats["min"],
        "x_axis_angles_max": x_axis_angles_stats["max"],
        "x_axis_angles_mean": x_axis_angles_stats["mean"],
        "x_axis_angles_standard_deviation": x_axis_angles_stats["standard_deviation"],
        "x_axis_angles_min_max_difference": x_axis_angles_stats["min_max_difference"],
        "curvatures_min": curvatures_stats["min"],
        "curvatures_max": curvatures_stats["max"],
        "curvatures_mean": curvatures_stats["mean"],
        "curvatures_standard_deviation": curvatures_stats["standard_deviation"],
        "curvatures_min_max_difference": curvatures_stats["min_max_difference"],
        "curvatures_square_min": curvatures_square_stats["min"],
        "curvatures_square_max": curvatures_square_stats["max"],
        "curvatures_square_mean": curvatures_square_stats["mean"],
        "curvatures_square_standard_deviation": curvatures_square_stats[
            "standard_deviation"
        ],
        "curvatures_square_min_max_difference": curvatures_square_stats[
            "min_max_difference"
        ],
        "straightness": straightness,
        "jitter": jitter,
        "number_of_pauses": pauses_num,
    }

    print(combined_stats)
    return combined_stats


@strokes_bp.route("", methods=["POST"])
def create_stroke():
    try:
        print("Creating stroke")

        events = request.get_json()["events"]

        combined_stats = process_stroke(events)
        combined_stats["user_email"] = request.get_json()["email"]

        # ----- Store the stroke in the database -----

        client.query(
            q.create(
                q.collection("strokes_2"),
                {"data": combined_stats},
            )
        )

        return {
            "status": "success",
            "message": "Stroke created",
        }

    except Exception as e:
        print(e)
        return "Failed to create stroke", 400


@strokes_bp.route("verify", methods=["POST"])
def verify_stroke_owner():
    try:
        print("Verifying stroke owner")

        expected_email = request.get_json()["email"]

        events = request.get_json()["events"]
        combined_stats = process_stroke(events)
        parsed_stroke = np.array(
            [[combined_stats[key] for key in combined_stats.keys()]]
        )

        predicted = imported_model.predict(parsed_stroke)

        print("predicted", predicted)

        if predicted[0] != expected_email:
            return "This Computer is not used by the owner of the account", 400

        return {
            "status": "success",
            "message": "Stroke owner verified",
        }

    except Exception as e:
        print(e)
        return "Failed to verify stroke owner", 400
