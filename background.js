// Copyright (c) 2018 Richard West. All rights reserved.

/**
 * Listen for a messages being sent from content script and handle as appropriate
 */
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "checkUrl") {
        getCurrentTabUrl(urlVerificationRequest);
    }
});


/**
 * Listen for tab being updated
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    getCurrentTabUrl(urlVerificationRequest);
});


/**
 * Listen for new tab being activated
 */
chrome.tabs.onActivated.addListener(function() {
    getCurrentTabUrl(urlVerificationRequest);
});


/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });

    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, (tabs) => {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function urlVerificationRequest(url) {
    // Do api request to check url

    if (url == 'https://www.google.co.uk/') {

        chrome.browserAction.setTitle({
            title: 'This domain has been verified by us'
        });

        chrome.browserAction.setIcon({
            path: 'justice-safe.png'
        });


        chrome.storage.sync.get('showBanner', function(choice) {
            if(choice.showBanner == 'yes') {
                // See https://developer.chrome.com/extensions/tabs#method-executeScript.
                // chrome.tabs.executeScript allows us to programmatically inject JavaScript
                // into a page. Since we omit the optional first argument "tabId", the script
                // is inserted into the active tab of the current window, which serves as the
                // default.
                chrome.tabs.executeScript({
                    file: 'banner-safe.js'
                });
                chrome.tabs.insertCSS({
                    file: 'banner.css'
                })
            }
        });
    } else if (url == 'https://tonic.works/') {
        chrome.browserAction.setTitle({
            title: 'This domain has been identified as fraudulent. Proceed with caution.'
        });

        chrome.browserAction.setIcon({
            path: 'justice-danger.png'
        });

        chrome.tabs.executeScript({
            file: 'banner-danger.js'
        });
        chrome.tabs.insertCSS({
            file: 'banner.css'
        });
    } else {
        chrome.browserAction.setTitle({title: 'Either this is not a law firm website or it has not been verified by us.'});
        chrome.browserAction.setIcon({path: 'justice.png'});
    }
}