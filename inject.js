let iframe;

const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%   { transform: translateY(0); }
    20%  { transform: translateY(-5px); }
    40%  { transform: translateY(3px); }
    60%  { transform: translateY(-2px); }
    80%  { transform: translateY(1px); }
    100% { transform: translateY(0); }
  }
  .bounce-animation {
    animation: bounce 0.6s ease-out;
  }
`;
document.head.appendChild(style);


function open() {
    iframecontainer = document.createElement('div');
    iframe = document.createElement('iframe');
    iframegrabber = document.createElement('div');

    // Set the attributes for the iframe
    iframe.src = chrome.runtime.getURL('scanner.html'); // Use the local popup.html file
    iframe.sandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation";
    iframe.allow = 'camera; microphone';
    iframe.style.width = '256px';
    iframe.style.height = '360px';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.pointerEvents = 'auto';
    iframe.style.zIndex = '123456789';
    iframe.style.transform = '(translate3d(0, 0, 1));'
    iframe.style.position = 'absolute';
    iframe.style.backgroundColor = 'rgb(137, 211, 180)'
    iframe.id = 'iframe'
    
//movable container containing the iframe
    iframecontainer.style.position = 'fixed';
    iframecontainer.style.top = '0';
    iframecontainer.style.right = '300px';
    iframecontainer.style.width = '0';
    iframecontainer.id = "iframecontainer";
    iframecontainer.style.zIndex = '1234567899';
    

    // grab bar
    iframegrabber.style.position = 'absolute';
    iframegrabber.style.top = '0px';
    iframegrabber.style.left = '48px';
    iframegrabber.style.width = "180px";
    iframegrabber.style.height = "48px";
    iframegrabber.id = "iframecontainergrabber"
    iframegrabber.style.zIndex = '1234567899';

    // Append the iframe to the body of the webpage
    document.body.appendChild(iframecontainer);
    iframecontainer.appendChild(iframegrabber);
    iframecontainer.appendChild(iframe);
}

function exit() {
    if (iframecontainer) {
        iframecontainer.remove();
        iframecontainer = null;
        iframe = null;
        iframegrabber = null;
        iframeexit = null;
    }
}

// read collapse
window.addEventListener("message", (event) => {

    iframe = document.getElementById('iframe')

    if (event.data?.type === "collapse") {
        
      if (event.data.collapsed) {
        iframe.style.width = '256px';
        iframe.style.height = '60px';
        
      } else {
        iframe.style.width = '256px';
        iframe.style.height = '360px';
    }

    iframe.classList.remove('bounce-animation');
    void iframe.offsetWidth;
    iframe.classList.add('bounce-animation');
  }

  console.log("collapsed toggle")
});


open();