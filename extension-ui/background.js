chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ blockedSites: [] });
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const url = new URL(details.url);
  if (url.protocol === 'chrome:' || url.protocol === 'about:') {
    return;
  }
 
  chrome.storage.local.get(["blockedSites"], (data) => {
    const blockedSites = data.blockedSites || [];
    const hostname = url.hostname.toLowerCase();

    if (blockedSites.some(site => hostname.includes(site))) {
      chrome.tabs.get(details.tabId, (tab) => {
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) {
          return;
        }
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: () => {
            //TODO  add UI for the hoops window
            window.stop();
            window.location.href = chrome.runtime.getURL('hoops.html');
          }
        }).catch(error => {
          console.error("Error executing script: ", error);
        });
      });
    }
  });
}, { url: [{ schemes: ['http', 'https'] }] });