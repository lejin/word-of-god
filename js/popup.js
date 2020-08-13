/**
 * Popup Object/Namespace
 */
let popup = {

  //Initialize - add events and necessary contents on DOM load
  init() {
    document.getElementById('go-to-options').addEventListener('click', popup.displayPopup);
    document.getElementById('openContactPage').addEventListener('click', popup.openContactPage);
    popup.setVersionNumber();
  },

  //Open options page
  displayPopup() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('/html/options.html'));
    }
  },

  //Open contact page link in new tab
  openContactPage() {
    chrome.tabs.create({ url: "http://jyinfopark.in" });
  },

  //read and set version number from Manifest.json
  setVersionNumber() {
    var manifestData = chrome.runtime.getManifest();
    document.getElementById("vNum").innerText = `v${manifestData.version}`;
  }
};

/**
 * Initialize popup on DOM contents loaded/Popup open
 */
document.addEventListener('DOMContentLoaded', popup.init);

