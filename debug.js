/**
 * Marzipano Hotspot Positioning Debug Tool
 *
 * This tool helps you position hotspots in your Marzipano panorama by:
 * 1. Showing current view coordinates (yaw/pitch) in real-time
 * 2. Letting you click to get coordinates for any point
 * 3. Providing a debug panel to visualize and copy coordinates
 */

(function () {
  // Create debug panel
  var debugPanel = document.createElement("div");
  debugPanel.style.position = "fixed";
  debugPanel.style.bottom = "10px";
  debugPanel.style.right = "10px";
  debugPanel.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  debugPanel.style.color = "white";
  debugPanel.style.padding = "10px";
  debugPanel.style.borderRadius = "5px";
  debugPanel.style.fontFamily = "monospace";
  debugPanel.style.fontSize = "12px";
  debugPanel.style.zIndex = "9999";
  debugPanel.style.minWidth = "300px";

  // Add title
  var title = document.createElement("h3");
  title.textContent = "Hotspot Position Debug Tool";
  title.style.margin = "0 0 10px 0";
  title.style.textAlign = "center";
  debugPanel.appendChild(title);

  // Current position
  var currentPosition = document.createElement("div");
  currentPosition.textContent = "Current view: Yaw: 0.0000, Pitch: 0.0000";
  debugPanel.appendChild(currentPosition);

  // Last click position
  var clickPosition = document.createElement("div");
  clickPosition.textContent = "Last click: Yaw: -, Pitch: -";
  clickPosition.style.marginTop = "5px";
  debugPanel.appendChild(clickPosition);

  // Copy button for last click
  var copyButton = document.createElement("button");
  copyButton.textContent = "Copy Last Click Coords";
  copyButton.style.display = "block";
  copyButton.style.marginTop = "10px";
  copyButton.style.padding = "5px";
  copyButton.style.width = "100%";
  copyButton.style.backgroundColor = "#4CAF50";
  copyButton.style.border = "none";
  copyButton.style.color = "white";
  copyButton.style.cursor = "pointer";
  copyButton.style.borderRadius = "3px";
  copyButton.disabled = true;

  copyButton.addEventListener("click", function () {
    var coordsText = clickPosition.textContent.replace("Last click: ", "");
    navigator.clipboard.writeText(coordsText).then(function () {
      copyButton.textContent = "Copied!";
      setTimeout(function () {
        copyButton.textContent = "Copy Last Click Coords";
      }, 1500);
    });
  });

  debugPanel.appendChild(copyButton);

  // Toggle visibility button
  var toggleButton = document.createElement("button");
  toggleButton.textContent = "Hide Panel";
  toggleButton.style.display = "block";
  toggleButton.style.marginTop = "10px";
  toggleButton.style.padding = "5px";
  toggleButton.style.width = "100%";
  toggleButton.style.backgroundColor = "#f44336";
  toggleButton.style.border = "none";
  toggleButton.style.color = "white";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.borderRadius = "3px";

  var panelVisible = true;
  toggleButton.addEventListener("click", function () {
    if (panelVisible) {
      debugPanel.style.height = "30px";
      debugPanel.style.overflow = "hidden";
      toggleButton.textContent = "Show Panel";
      panelVisible = false;
    } else {
      debugPanel.style.height = "auto";
      toggleButton.textContent = "Hide Panel";
      panelVisible = true;
    }
  });

  debugPanel.appendChild(toggleButton);

  // Add to body
  document.body.appendChild(debugPanel);

  // Wait for Marzipano to be loaded and initialized
  var checkInterval = setInterval(function () {
    if (window.viewer) {
      clearInterval(checkInterval);
      initializeDebugTool();
    }
  }, 500);

  function initializeDebugTool() {
    var viewer = window.viewer;
    var panoElement = document.querySelector("#pano");

    // Update current position on view change
    viewer.addEventListener("viewChange", function () {
      var view = viewer.view();
      if (!view) return;

      var params = view.parameters();
      currentPosition.textContent =
        "Current view: Yaw: " +
        params.yaw.toFixed(4) +
        ", Pitch: " +
        params.pitch.toFixed(4);
    });

    // Capture click positions
    panoElement.addEventListener("click", function (e) {
      var view = viewer.view();
      if (!view) return;

      var coords = view.screenToCoordinates({ x: e.clientX, y: e.clientY });
      clickPosition.textContent =
        "Last click: Yaw: " +
        coords.yaw.toFixed(4) +
        ", Pitch: " +
        coords.pitch.toFixed(4);

      copyButton.disabled = false;

      // Format for data.js
      var codeSnippet = `{
  "yaw": ${coords.yaw.toFixed(4)},
  "pitch": ${coords.pitch.toFixed(4)},
  "title": "Your Title Here",
  "text": "Your description here.",
  "customIconSrc": "img/ajmer.png",
  "elevated": true
}`;

      console.log("Coordinates for your data.js file:");
      console.log(codeSnippet);
    });
  }
})();
