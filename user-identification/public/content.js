document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mousedown", handleMouseDown);

const handleMouseMove = (event) => {
  chrome.runtime.sendMessage({
    eventType: "mouseMove",
    eventDetails: { x: event.clientX, y: event.clientY, timestamp: Date.now() },
  });
};

const handleMouseDown = (event) => {
  chrome.runtime.sendMessage({ eventType: "mouseDown" });
};
