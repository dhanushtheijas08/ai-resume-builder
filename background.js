let globalTaburl;

// Listen for tab updates and inject content.js file
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  chrome.tabs.get(tabId, function (tabInfo) {
    if (changeInfo.status !== "complete") return;
    const regexPattern =
      /^https:\/\/chat\.openai\.com(?:\/[^/]+\/[^/]+|\/[^/]+|)$/;
    if (tabInfo.url.match(regexPattern)) {
      globalTaburl = tabInfo.url;
      chrome.scripting.executeScript({
        target: { tabId: tabInfo.id },
        files: ["contentScript.js"],
      });
    }
  });
});
