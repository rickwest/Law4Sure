// Send a simple message from content script with name of desired action.
chrome.runtime.sendMessage({action: 'checkUrl'});