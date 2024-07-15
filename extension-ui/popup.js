document.addEventListener('DOMContentLoaded', function () {
  var blockSitesBtn = document.getElementById('blockSitesBtn');
  var browsingDataBtn = document.getElementById('browsingDataBtn');
  var blockDiv = document.getElementById('blockDiv');
  var browsingDataDiv = document.getElementById('browsingDataDiv');

  blockSitesBtn.addEventListener('click', function () {
    blockDiv.classList.remove('hidden');
    browsingDataDiv.classList.add('hidden');
    chrome.storage.local.get(["blockedSites", "originalUrls"], (data) => {
      const originalUrls = data.originalUrls || [];
      originalUrls.forEach((url) => {
        const li = document.createElement("li");
        li.textContent = url;
        blockedSitesList.appendChild(li);
      });
    });
  });

  browsingDataBtn.addEventListener('click', function () {
    browsingDataDiv.classList.remove('hidden');
    blockDiv.classList.add('hidden');
    // Add logic to display browsing data here
    // For now, just display a message
    browsingDataDiv.innerHTML = '<h3>Browsing Data:</h3><p>This is where browsing data will be displayed.</p>';
  });

  const blockForm = document.getElementById("blockForm");
  const siteInput = document.getElementById("siteInput");

  blockForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputUrl = siteInput.value.trim();
    if(inputUrl){
      url = new URL(inputUrl)
    // const url = new URL(inputUrl);
    const hostname = url.hostname.toLowerCase();
    if (hostname) {
      chrome.storage.local.get(["blockedSites", "originalUrls"], (data) => {
        const blockedSites = data.blockedSites || [];
        const originalUrls = data.originalUrls || [];
        if (!blockedSites.includes(hostname)) {
          blockedSites.push(hostname);
          originalUrls.push(inputUrl);
          chrome.storage.local.set({ blockedSites: blockedSites, originalUrls: originalUrls });
          const li = document.createElement("li");
          li.textContent = inputUrl;
          blockedSitesList.appendChild(li);
        }
      });
    }}
    siteInput.value = "";
  });
});