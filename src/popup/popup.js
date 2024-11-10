document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
  chrome.scripting.executeScript({
    target: { tabId },
    files: ["dist/foreground.js"]
  }, () => {
    // After ensuring content.js is injected, send the message
    chrome.tabs.sendMessage(tabId, { action: "connectToServer" });
  });
});


    // Select the button and add a click event listener
    const highlightButton = document.getElementById("changeTextButton");

    highlightButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabId = tabs[0].id;
          
          // Inject content.js dynamically if it hasn't been loaded
          chrome.scripting.executeScript({
            target: { tabId },
            files: ["dist/foreground.js"]
          }, () => {
            // After ensuring content.js is injected, send the message
            chrome.tabs.sendMessage(tabId, { action: "changeEditableDivText" });
          });
        });
      });



    
    
  });




 
  window.addEventListener("beforeunload", () => {
    console.log("beforeunload");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { action: "disconnectToServer" });
    });
  });
