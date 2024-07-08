
document.addEventListener('DOMContentLoaded', function() {
  var blockSitesBtn = document.getElementById('blockSitesBtn');
  blockSitesBtn?.addEventListener('click', function() {
    chrome.tabs.create({ url: 'block.html' });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var blockSitesBtn = document.getElementById('browsingData');
  blockSitesBtn?.addEventListener('click', function() {
    chrome.tabs.create({ url: 'bro.html' });
  });
});


