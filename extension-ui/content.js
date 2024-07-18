chrome.storage.local.get("blockedSites", (data) => {
    const blockedSites = data.blockedSites || [];
    const hostname = window.location.hostname.toLowerCase();
    const domain = hostname.split(".")[1];
    if (blockedSites.includes(domain)) {
        window.location.href = chrome.runtime.getURL('hoops.html');
    }
});
