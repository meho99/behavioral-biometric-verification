import { call, put } from "typed-redux-saga";
import { MouseEventsActions, mouseEventsActions } from "../mouseEvents.slice";
import { MousePositionEvent } from "../mouseEvents.types";
import { MAX_STROKE_TIME } from "../mouseEvents.const";
import { createStroke } from "../../../api/createStroke";
import { notificationActions } from "../../notifications/notifications.slice";

const removeNullSpaceEvents = (
  events: MousePositionEvent[]
): MousePositionEvent[] => {
  return events.reduce((prev, event) => {
    if (prev.length === 0) {
      return [event];
    }

    const lastEvent = prev[prev.length - 1];

    if (lastEvent.x === event.x && lastEvent.y === event.y) {
      return prev;
    }

    if (lastEvent.timestamp === event.timestamp) {
      return prev;
    }

    return [...prev, event];
  }, [] as MousePositionEvent[]);
};

export function* postStrokeSaga({ payload }: MouseEventsActions["postStroke"]) {
  try {
    console.log("stroke before", payload);
    const events = yield* call(removeNullSpaceEvents, payload);

    if (events.length < 4) {
      console.log("stroke ignored because it has less than 4 events");
      return;
    }

    const strokeTime =
      events[events.length - 1].timestamp - events[0].timestamp;
    if (strokeTime > MAX_STROKE_TIME) {
      console.log("stroke ignored because it took too long");
      return;
    }

    console.log("stroke validated, sending to server...");
    console.log("stroke:", events);

    yield* call(createStroke, {
      email: localStorage.getItem("userEmail")!,
      events,
    });

    yield* put(mouseEventsActions.postStrokeSuccess());
  } catch (e) {
    yield* put(mouseEventsActions.postStrokeError());

    yield* put(
      notificationActions.addErrorNotification({
        e,
        msg: "Failed to save mouse events",
      })
    );
  }
}
