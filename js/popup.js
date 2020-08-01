function displayPopup() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

document.getElementById('go-to-options').addEventListener('click', displayPopup);