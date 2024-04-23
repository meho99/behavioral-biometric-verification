const MAX_STROKE_TIME = 10 * 1000;

let mousePositions = [];
let userEmail;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Received alarm", alarm);
});

const removeNullSpaceEvents = (events) => {
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
  }, []);
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.eventType === "loginCompleted") {
    console.log("Login completed", message.eventDetails);
    userEmail = message.eventDetails.email;
  }

  if (message.eventType === "mouseMove") {
    if (!!userEmail) {
      mousePositions.push(message.eventDetails);
    }
  }

  if (message.eventType === "mouseDown") {
    console.log("Mouse down event received", mousePositions);
    const cleanedEvents = removeNullSpaceEvents(mousePositions);

    if (cleanedEvents.length < 4) {
      console.log("stroke ignored because it has less than 4 events");
      return;
    }

    const strokeTime =
      cleanedEvents[cleanedEvents.length - 1].timestamp -
      cleanedEvents[0].timestamp;

    if (strokeTime > MAX_STROKE_TIME) {
      console.log("stroke ignored because it took too long");
      return;
    }

    // send to server somehow

    mousePositions = [];
  }
});
