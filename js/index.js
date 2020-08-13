/**
 * New Tab Object/Namespace
 */
let newTab = {

    //predefined BG colors
    bgColors: ["#B71C1C", "#880E4F", "#4A148C", "#311b92", "#1a237e", "#0d47a1", "#01579b", "#006064", "#f57f17", "#1b5e20", "#33691E"],

    //Generate random integer
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    getRandomColor() {
        var randomNumber = newTab.getRandomInt(newTab.bgColors.length);
        return newTab.bgColors[randomNumber];
    },

    //set random BG from the predefiend list above and saves to prevent repetition
    setRandomBGColor() {
        var bgColor = newTab.getRandomColor();
        chrome.storage.local.get(['lastColor'], function (result) {
            if (null != result.lastColor && result.lastColor == bgColor) {
                do {
                    bgColor = newTab.getRandomColor();
                } while (bgColor != result.lastColor);
            }
        });
        document.body.style.backgroundColor = bgColor;
        document.body.style.color = "#f1efe6";
        chrome.storage.local.set({ lastColor: bgColor }, function () {
        });
    },

    //get random color using Chroma.js
    //https://gka.github.io/chroma.js/#chroma-random
    chromaSetRandomBG() {
        let maxSaturation = 0.5;
        let maxLightness = 0.4;
        let randomColor = chroma.random();

        if (randomColor.get("hsl.s") > maxSaturation) {
            randomColor = randomColor.set("hsl.s", maxSaturation);
        }

        if (randomColor.get("hsl.l") > maxLightness) {
            randomColor = randomColor.set("hsl.l", maxLightness);
        }

        document.body.style.color = "#fff";
        document.body.style.backgroundColor = randomColor;
    },

    rotateHSLColorBG() {
        let hueInc = 12;
        chrome.storage.local.get(['hue'], function (result) {
            let hue = result.hue !== undefined && result.hue + hueInc <= 360 ? result.hue + hueInc : 0;
            console.log(hue, result);
            chrome.storage.local.set({ hue: hue }, function () {
                document.body.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
                document.body.style.color = "#f1efe6";
            });
        });
    },

    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    showQuote() {
        // Use default value language=english.
        chrome.storage.sync.get({
            language: 'english'
        }, function (items) {
            if (items.language == 'malayalam') {
                const url = chrome.runtime.getURL('/data/malayalam.json');
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => newTab.generateRandomQuote(json));
            } else {
                const url = chrome.runtime.getURL('/data/english.json');
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => newTab.generateRandomQuote(json));
            }
        });
    },

    //Show random quote on new tab
    generateRandomQuote(json) {
        //newTab.setRandomBGColor();
        //newTab.chromaSetRandomBG();
        newTab.rotateHSLColorBG();
        var randomNumber = newTab.getRandomInt(json.length);
        document.getElementById('quote').textContent = json[randomNumber].quote;
        document.getElementById('verse').textContent = json[randomNumber].verse;
    },

};

document.addEventListener('DOMContentLoaded', newTab.showQuote);