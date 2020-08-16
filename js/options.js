/**
 * Options Namespace/Object
 */
let Options = {
  /**
   * initialize events and values
   */
  init() {
    Options.initMaterialSelect();
    Options.showOptions();
    document.getElementById('save').addEventListener('click', Options.saveOptions);
  },

  /**
   * Materilize UI Select init
   */
  initMaterialSelect() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  },

  /**
   * Show user option values saved in chrome.storage
   */
  showOptions() {
    // Use default value language=english.
    chrome.storage.local.get({
      language: 'english',
      links: false
    }, function (items) {
      document.getElementById('language').value = items.language;
      document.getElementById('mostUsedLinks').checked = items.links
      Options.initMaterialSelect(); //re-initialise material select to set selected value
    });
  },

  /**
   * Saves options to chrome.storage
   */
  saveOptions() {
    var language = document.getElementById('language').value;
    var links = document.getElementById('mostUsedLinks').checked;
    chrome.storage.local.set({
      language: language,
      links: links
    }, function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function () {
        status.textContent = '';
      }, 1500);
    });
  }
};

/**
 * Initialise Options on DOM load
 */
document.addEventListener('DOMContentLoaded', Options.init());

