function open() {
    iframecontainer = document.createElement('div');
    iframe = document.createElement('iframe');
    iframegrabber = document.createElement('div');

    // Set the attributes for the iframe
    iframe.src = chrome.runtime.getURL('popup.html'); // Use the local popup.html file
    iframe.sandbox = "allow-scripts allow-same-origin allow-forms allow-popups";
    iframe.allow = 'camera; microphone';
    iframe.style.width = '300px';
    iframe.style.height = '300px';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.pointerEvents = 'auto';
    iframe.style.zIndex = '123456789';
    iframe.style.transform = '(translate3d(0, 0, 1));'
    iframe.style.position = 'absolute';

    // movable container containing the iframe
    iframecontainer.style.position = 'fixed';
    iframecontainer.style.top = '0';
    iframecontainer.style.left = '0';
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

    //Append the iframe to the body of the webpage
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


open();