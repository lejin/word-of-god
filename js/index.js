let bgColors = ["#B71C1C", "#880E4F", "#4A148C", "#311b92", "#1a237e", "#0d47a1", "#01579b", "#006064", "#f57f17", "#1b5e20", "#33691E"];

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function showQuote() {
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
    setRandomBGColor();
    var randomNumber = getRandomInt(json.length);
    document.getElementById('quote').textContent = json[randomNumber].quote;
    document.getElementById('verse').textContent = json[randomNumber].verse;
}

function setRandomBGColor() {
    var bgColor=getRandomColor();
    chrome.storage.local.get(['lastColor'], function(result) {
        if(null!=result.lastColor && result.lastColor==bgColor){
            do{
               bgColor=getRandomColor(); 
            }while(bgColor!=result.lastColor);
        }
      });
    document.body.style.backgroundColor = bgColor;
    chrome.storage.local.set({lastColor: bgColor}, function() {
      });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.addEventListener('DOMContentLoaded', showQuote);

function getRandomColor(){
    var randomNumber = getRandomInt(bgColors.length);
    return bgColors[randomNumber];
}