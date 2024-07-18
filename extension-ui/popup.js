
document.addEventListener('DOMContentLoaded', function () {
  var blockSitesBtn = document.getElementById('blockSitesBtn');
  var browsingDataBtn = document.getElementById('browsingDataBtn');
  var blockDiv = document.getElementById('blockDiv');
  var browsingDataDiv = document.getElementById('browsingDataDiv');
  var blockedSitesList = document.getElementById('blockedSitesList');
  var enterSite = document.getElementById('enterSite');
  //TODO change address to be according to docker-file
  enterSite.addEventListener('click', function () {
    chrome.tabs.create({url:'http://localhost:3000/home'})
  });
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
    browsingDataDiv.innerHTML = '<h3>Browsing Data:</h3><p>This is where browsing data will be displayed.</p>';
  });
  const blockForm = document.getElementById("blockForm");
  const siteInput = document.getElementById("siteInput");
  blockForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputUrl = siteInput.value.trim();
    if (inputUrl) {
      try {
        const url = new URL(inputUrl);
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
        }
      } catch (e) {
        console.error('Invalid URL');
      }
    }
    siteInput.value = "";
  });
});