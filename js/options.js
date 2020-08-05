// Saves options to chrome.storage
function save_options() {
  var language = document.getElementById('language').value;
  chrome.storage.sync.set({
    language: language
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value language=english.
  chrome.storage.sync.get({
    language: 'english'

  }, function (items) {
    document.getElementById('language').value = items.language;
    initMaterialSelect(); //re-initialise material select to set selected value
  });
}

function initMaterialSelect() {
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
}

document.addEventListener('DOMContentLoaded', function () {
  initMaterialSelect();
  restore_options();
});
document.getElementById('save').addEventListener('click', save_options);
