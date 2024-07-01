let latestVerificationStatus = null;

const handleMouseMove = (event) => {
  chrome.runtime.sendMessage({
    eventType: "mouseMove",
    eventDetails: {
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
    },
  });
};

const handleMouseDown = () => {
  chrome.runtime.sendMessage({ eventType: "mouseDown" });
};

const handleCheckStatuses = () => {
  console.log("Checking statuses");
  chrome.runtime.sendMessage(
    { eventType: "getUserData" },
    ({ finalVerificationResults }) => {
      console.log("Received statuses", finalVerificationResults);

      const newStatuses = finalVerificationResults
        .filter(({ timestamp }) => {
          if (!latestVerificationStatus) {
            return true;
          }
          return timestamp > latestVerificationStatus.timestamp;
        })
        .map(({ status }) => status);

      console.log("newStatuses", newStatuses);

      if (newStatuses.includes("failed")) {
        alert("This computer is not used by the authorized user!");
      }

      latestVerificationStatus =
        finalVerificationResults[finalVerificationResults.length - 1];
    }
  );
};

let checkStatusesInterval = null;

const main = () => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mousedown", handleMouseDown);

  checkStatusesInterval = setInterval(handleCheckStatuses, 15 * 1000);
};

const destructionEvent = "destructmyextension_" + chrome.runtime.id;

function destructor() {
  console.log("destructing content script");
  // Destruction is needed only once
  document.removeEventListener(destructionEvent, destructor);
  // Tear down content script: Unbind events, clear timers, restore DOM, etc.
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mousedown", handleMouseDown);

  if (checkStatusesInterval) {
    clearInterval(checkStatusesInterval);
  }
}

// Unload previous content script if needed
document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);

main();
