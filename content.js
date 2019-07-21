function urlGetter() {
    var urlFound = false;
    var videoURL = "";
    try {
        //if (urlFound == false) {
            videoURL = document.querySelector("#article_body > aside > p > a").getAttribute("data-mobileurl")
            urlFound = true;
        //}
    } catch (e) {
        console.log("Not found under #article_body > aside > p > a");
    }
    try {
        if (urlFound == false) {
            videoURL = document.querySelector("#article_introduction > div > div > aside > p > a").getAttribute("data-mobileurl")
            urlFound = true;
        }
    } catch (e) {
        console.log("Not found under #article_introduction > div > div > aside > p > a")
    }
    try {
        if (urlFound == false) {
            videoURL = document.querySelector("#article__s001 > div > div > aside > p > a").getAttribute("data-mobileurl")
            urlFound = true;
        }
    } catch (e) {
        console.log("Not found under #article__s001 > div > div > aside > p > a")
    }
    try {
        if (urlFound == false) {
            videoURL = document.querySelector("#full > section:nth-child(2) > aside > p > a").getAttribute("data-mobileurl")
            urlFound = true;
        }
    } catch (e) {
        console.log("Not found under #full > section:nth-child(2) > aside > p > a")
    }
	try {
        if (urlFound == false) {
            videoURL = document.querySelector("#article_figures > ol > li.m-media-item.m-audio-video > a").getAttribute("data-mobileurl")
            urlFound = true;
        }
    } catch (e) {
        console.log("Not found under #article_figures > ol > li.m-media-item.m-audio-video > a")
    }
	try {
        if (urlFound == false) {
            videoURL = document.querySelector("#article__sc1 > div > div > aside > p > a.m-media-item__link.js__audioWindow").getAttribute("data-mobileurl")
            urlFound = true;
        }
    } catch (e) {
        console.log("Not found under #article__sc1 > div > div > aside > p > a.m-media-item__link.js__audioWindow")
    }
    try {
        if (urlFound == false) {
            videoURL = document.querySelector("body > table > tbody > tr:nth-child(2024) > td.line-content > span:nth-child(19) > span:nth-child(6)").innerText
            urlFound = true;
        }
    } catch (e) {
        console.log("Not found under body > table > tbody > tr:nth-child(2024) > td.line-content > span:nth-child(19) > span:nth-child(6)")
    }
    try {
        if (urlFound == false) {
            videoURL = document.querySelector("body > table > tbody > tr:nth-child(2035) > td.line-content > span:nth-child(10) > span:nth-child(6)").innerText
            urlFound = true;
        }
    } catch (e) {
        console.log("Not found under body > table > tbody > tr:nth-child(2035) > td.line-content > span:nth-child(10) > span:nth-child(6)")
        console.log("Out of ideas.");
        videoURL = "null";
    }
    return videoURL
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
		console.log("Message received from popup");
        sendResponse({response: urlGetter()});
    }
);

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
     port.postMessage(urlGetter());
  });
});