function downloadVideo() { //Used for the "Download file" button that appears
    chrome.downloads.download({
        url: document.getElementById("link").innerText, //Grab the link again from the DOM
        filename: "Video.mp4" //Default filename
    });
}

function comURL() { //Stands for "communicate URL," runs once content script is injected
    chrome.tabs.query({ //Get list of tabs (only returns active one due to permissions)
        active: true,
        currentWindow: true
    }, function(tabs) { //Callback once we have the current tab
        const port = chrome.tabs.connect(tabs[0].id); //Open the communication port
        port.onMessage.addListener(function(response) { //Prepare to handle the response
            var videoURL = response;
            var displayOut;
            if (videoURL == "null") { //If we actually couldn't find the video URL
                displayOut = "No video URL was found on this page. This doesn't mean that there isn't one, just that the extension was not able to scrape a link off of the page. This extension only works on NEJM pages."
            } else if (videoURL == "invalid") { //If we're not even on an NEJM page
                displayOut = "The current webpage is not an NEJM article."
            } else if (videoURL == "unsupported") { //If we don't support the current page type (not a DOI article page)
                displayOut = "The extension does not support this type of NEJM page."
            } else { //If it passed all the sanity checks
                displayOut = "<a id='link' target='_blank' href='" + videoURL + "'>" + videoURL + "</a><br/><br/><button id='trigger' type='button'>Download file</button><br/><br/><video src='" + videoURL + "' controls>Video.</video>"
            }
            document.getElementById("out").innerHTML = displayOut; //Write whatever the output was to DOM
            if (videoURL != "null") {
                document.getElementById("trigger").addEventListener("click", downloadVideo) //Hook downloadVideo() to the download button
            }
        });
        port.postMessage(null); //Trigger the content script
    });
}

window.addEventListener('load', (event) => { //Make sure that the DOM is fully constructed
    try {
        chrome.tabs.executeScript(null, { //Inject the content script
            file: '/content.js'
        }, comURL()); //Add the callback to talk to the injected script
    } catch (e) { //Prevent uncaught errors
        document.getElementById("out").innerHTML = "Unable to inject script."
    }
});