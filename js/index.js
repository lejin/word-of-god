// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value language=english.
    chrome.storage.sync.get({
        language: 'english'

    }, function (items) {
        if (items.language == 'malayalam') {
            const url = chrome.runtime.getURL('/data/malayalam.json');

            fetch(url)
                .then((response) => response.json())
                .then((json) => generateRandomQuote(json));

        } else {
            const url = chrome.runtime.getURL('/data/english.json');

            fetch(url)
                .then((response) => response.json())
                .then((json) => generateRandomQuote(json));
        }

    });
}

function generateRandomQuote(json) {
    var randomNumber=getRandomInt(json.length);
    document.getElementById('quote').textContent = json[randomNumber].quote;
    document.getElementById('verse').textContent = json[randomNumber].verse;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

document.addEventListener('DOMContentLoaded', restore_options);