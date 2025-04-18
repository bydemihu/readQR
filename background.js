chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.qrLink) {
        chrome.tabs.update({ url: message.qrLink });
    }
});

chrome.webNavigation.onCommitted.addListener((details) => {
  const { url, frameId, tabId } = details; // Make sure this line comes FIRST

  console.log("Navigated:", url, "frameId:", frameId);
  const EXTENSION_SCANNER_URL = chrome.runtime.getURL("scanner.html");

  if (!url.startsWith("https://utdesigncapstone25.com")) {

    // Allow internal pages and extension iframe
  if (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("devtools://") ||
    url.startsWith(EXTENSION_SCANNER_URL)
  ) {
    return;
  }

    // Only check top-level pages
    if (frameId !== 0) return;

    chrome.tabs.update(tabId, { url: "https://utdesigncapstone25.com" });
  }
});