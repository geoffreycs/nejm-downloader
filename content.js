//Written by geoffreycs

function urlGetter() {
    if (location.href.indexOf("www.nejm.org") == -1) { //Sanity check 1: Is this even a NEJM page?
        videoURL = "invalid"
    } else if (location.href.indexOf("/doi/") == -1) { //Sanity check 2: Is this a support "doi" page?
        videoURL = "unsupported"
    } else { //Sanity checks passed, begin searching through page as per rules
        var urlFound = false;
        var videoURL = "";
        try {
            //if (urlFound == false) {
            videoURL = document.querySelector("#article_body > aside > p > a").getAttribute("data-mobileurl")
            if (videoURL.indexOf(".mp4") !== -1) { //Make sure we found an MP4 video, not an MP3 track
                urlFound = true;
            }
            //}
        } catch (e) {
            console.log("Not found under #article_body > aside > p > a");
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#article_introduction > div > div > aside > p > a").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #article_introduction > div > div > aside > p > a")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#article__s001 > div > div > aside > p > a").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #article__s001 > div > div > aside > p > a")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#full > section:nth-child(2) > aside > p > a").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #full > section:nth-child(2) > aside > p > a")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#article_figures > ol > li.m-media-item.m-audio-video > a").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #article_figures > ol > li.m-media-item.m-audio-video > a")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#article_introduction > div > div > span > p > a").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #article_introduction > div > div > span > p > a")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#article_figures > ol > span > p > a").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #article_figures > ol > span > p > a")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#article__sc1 > div > div > aside > p > a.m-media-item__link.js__audioWindow").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #article__sc1 > div > div > aside > p > a.m-media-item__link.js__audioWindow")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("body > table > tbody > tr:nth-child(2024) > td.line-content > span:nth-child(19) > span:nth-child(6)").innerText
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under body > table > tbody > tr:nth-child(2024) > td.line-content > span:nth-child(19) > span:nth-child(6)")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("#article_introduction > div > div > aside:nth-child(2) > p > a").getAttribute("data-mobileurl")
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under #article_introduction > div > div > aside:nth-child(2) > p > a")
        }
        try {
            if (urlFound == false) {
                videoURL = document.querySelector("body > table > tbody > tr:nth-child(2035) > td.line-content > span:nth-child(10) > span:nth-child(6)").innerText
                if (videoURL.indexOf(".mp4") !== -1) {
                    urlFound = true;
                }
            }
        } catch (e) {
            console.log("Not found under body > table > tbody > tr:nth-child(2035) > td.line-content > span:nth-child(10) > span:nth-child(6)")
            console.log("Out of ideas."); //We've run through every single test pattern and no URL was found.
            videoURL = "null";
        }

    }
    return videoURL //Return the results
}

/* //Old implementation
chrome.runtime.onMessage.addListener( //Set up handler for the message from extension toolbar
    function(message, sender, sendResponse) {
        //console.log("Message received from popup"); //For testing only
        sendResponse({
            response: urlGetter() //Send back our results
        });
    }
);
*/

chrome.runtime.onConnect.addListener((port) => { //Set up handler for the message from extension toolbar
    port.onMessage.addListener((msg) => {
        port.postMessage(urlGetter()); //Send back our results
    });
});