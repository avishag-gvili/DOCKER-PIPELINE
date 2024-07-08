chrome.storage.local.get("blockedSites", (data) => {
    const blockedSites = data.blockedSites || [];
    const hostname = window.location.hostname.toLowerCase();
    const domain = hostname.split(".")[1];
    console.log(domain);
    if (blockedSites.includes(domain)) {
       alert("Access to this site is blocked.");
       window.location.href = "https://www.google.com"; // Redirect to Google as an example
    }
});