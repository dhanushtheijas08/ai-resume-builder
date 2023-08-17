"use strict";
let globalTaburl;

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "https://chat.openai.com/chat" });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ url: "https://chat.openai.com/chat" }, function ([tab]) {
    if (tab) {
      chrome.tabs.update(tab.id, { active: true });
    } else {
      chrome.tabs.create({ url: "https://chat.openai.com/chat" });
    }
  });
});

// Pre-fill prompt input with user input using omnibox
chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.create({
    url: `https://chat.openai.com/?AIPRM_Prompt=${encodeURIComponent(text)}`,
  });
});

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
