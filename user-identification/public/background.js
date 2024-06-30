const MAX_STROKE_TIME = 10 * 1000;

let mousePositions = [];
let allPositionsToSend = [];
let userEmail;

let verificationStatuses = [];
let finalVerificationResults = [];

const verifyStrokeOwner = async (dto) => {
  const response = await fetch("http://127.0.0.1:5000/strokes/verify", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(dto),
  });

  verificationStatuses.push(response.status === 200 ? "success" : "failed");

  if (verificationStatuses.length >= 5) {
    const successCount = verificationStatuses.filter(
      (status) => status === "success"
    ).length;

    if (successCount >= 3) {
      finalVerificationResults.push("success");
    } else {
      finalVerificationResults.push("failed");
    }

    verificationStatuses = [];
  }
};

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

    return;
  }

  if (message.eventType === "mouseMove") {
    if (userEmail) {
      mousePositions.push(message.eventDetails);
    }

    return;
  }

  if (message.eventType === "mouseDown") {
    console.log("Mouse down event received", mousePositions);
    const cleanedEvents = removeNullSpaceEvents(mousePositions);
    mousePositions = [];

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

    allPositionsToSend.push(cleanedEvents);

    if (allPositionsToSend.length >= 5) {
      console.log("Sending all positions", allPositionsToSend);
      for (const events of allPositionsToSend) {
        verifyStrokeOwner({
          email: userEmail,
          events,
        });
      }

      allPositionsToSend = [];
    }

    return;
  }

  if (message.eventType === "getVerificationStatuses") {
    sendResponse(finalVerificationResults);
    finalVerificationResults = [];
  }
});
