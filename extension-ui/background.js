chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ blockedSites: [] });
  });
  
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    chrome.storage.local.get("blockedSites", (data) => {
      const blockedSites = data.blockedSites || [];
      const url = new URL(details.url);
      const hostname = url.hostname.toLowerCase();
      if (blockedSites.includes(hostname)) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: () => {
            alert("Access to this site is blocked.");
            window.location.href = "https://www.google.com"; // Redirect to Google as an example
          }
        });
      }
    });
  }, { url: [{ schemes: ['http', 'https'] }] });  // Match both HTTP and HTTPS URLs