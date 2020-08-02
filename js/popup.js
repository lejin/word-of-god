function displayPopup() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('/html/options.html'));
  }
}

function openContactPage() {
  chrome.tabs.create({url: "http://jyinfopark.in"});
}

document.getElementById('go-to-options').addEventListener('click', displayPopup);
document.getElementById('openContactPage').addEventListener('click', openContactPage);