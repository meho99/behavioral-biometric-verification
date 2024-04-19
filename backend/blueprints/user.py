from flask import Blueprint, request
from faunadb import query as q

from config import client

user_bp = Blueprint("user", __name__, url_prefix="/user")

# ----- Login to existing user -----


# TODO: jwt tokens
@user_bp.route("/login", methods=["POST"])
def login():
    try:
        client.query(
            q.login(
                q.match(q.index("user_by_email"), request.get_json()["email"]),
                {"password": request.get_json()["password"]},
            )
        )

        return {
            "status": "success",
            "message": "Login successful",
            "email": request.get_json()["email"],
        }

    except:
        return "User does not exist. Please sign up.", 400


# ----- Sign up new user -----


# TODO: jwt tokens
@user_bp.route("/signup", methods=["POST"])
def sign_up():
    try:
        existing_user = client.query(
            q.get(q.match(q.index("user_by_email"), request.get_json()["email"]))
        )

        if existing_user:
            return "User already exists with this email. Please login.", 400
    except:
        print("No existing user:")

    client.query(
        q.create(
            q.collection("users"),
            {
                "credentials": {"password": request.get_json()["password"]},
                "data": {"email": request.get_json()["email"]},
            },
        )
    )

    return {
        "status": "success",
        "message": "Sign Up successful",
        "email": request.get_json()["email"],
    }
