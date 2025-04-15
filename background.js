chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.qrLink) {
        chrome.tabs.update({ url: message.qrLink });
    }
});

