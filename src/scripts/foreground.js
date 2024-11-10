const socketIOClient = require('socket.io-client');


let socket;
let connected = false;

async function disconnectToServer() {
 if(socket) {
    socket.disconnect();
 }
}

async function connectToServer() {
  disconnectToServer();
  const cn= localStorage.getItem('connected');
if(!socket && cn !== 'true') {
     socket = socketIOClient('8386-115-73-217-156.ngrok-free.app');
     connected = true;
     localStorage.setItem('connected', true);
    socket.on('connect', () => {
        console.log('Connected to server');
    });


    socket.on('vocab', (message) => {
      const editableDiv = document.querySelector('div[contenteditable="true"]');
    if (editableDiv) {
      editableDiv.textContent = message;

     setTimeout(() => {
        const button  = document.querySelector('button[data-testid="send-button"]');
        button.click();
     }, 1000)

     const interval = setInterval(() => {
      checkMessageReady(interval);
  }, 1000);
    } else {
    }
    });
  }else {
    console.log("socket already connected")
  }
}


async function changeEditableDivText() {

 

    // Find the first <div> element with contenteditable="true"
    // const editableDiv = document.querySelector('div[contenteditable="true"]');
    // if (editableDiv) {
    //   // Change its text content to "Hello"
    //   editableDiv.textContent = "Give me 10 vocabulary words";

    //  setTimeout(() => {
    //     const button  = document.querySelector('button[data-testid="send-button"]');
    //     button.click();
    //  }, 1000)
    // } else {
    // }
  }
  
  // Listen for the message from popup.js
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "changeEditableDivText") {
      changeEditableDivText();
        const interval = setInterval(() => {
            checkMessageReady(interval);
        }, 1000);
      
    }else if (request.action === "connectToServer") {
      connectToServer();
    }else if (request.action === "disconnectToServer") {
      disconnectToServer();
    }
  });


  function checkMessageReady(interval) {
    const sendButton = document.querySelector('button[data-testid="send-button"]');

  if (sendButton) {
    const isDisabled = sendButton.disabled;
    if(isDisabled) {
        captureChatMessages();
        clearInterval(interval);
    }
  } else {
  }
  }



// Function to capture chat messages
function captureChatMessages() {
    console.log("captureChatMessages function called")
    // Use MutationObserver to watch for changes in the chat message container
    const chatContainers = document.querySelectorAll('article');
    
    const chatContainer = chatContainers[chatContainers.length - 1];
    console.log(chatContainer, "chatContainer")
    if (!chatContainer) return;

    console.log(chatContainer.textContent, "chatContainer.textContent")

    fetch('https://8386-115-73-217-156.ngrok-free.app/vocab', {
      method: 'POST',
      body: JSON.stringify({ message: chatContainer.textContent }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
//   const messages = chatContainer.querySelectorAll('*'); // Select all elements within the chat container
//   messages.forEach(message => {
//       console.log(message.textContent); // Log the text content of each message
//   });
}
  

