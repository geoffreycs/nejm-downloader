function downloadVideo() {
	chrome.downloads.download({
		url: document.getElementById("link").innerText,
		filename: "Video.mp4" // Optional
	});
}

function comURL() {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const port = chrome.tabs.connect(tabs[0].id);
	port.onMessage.addListener(function(response) {
        var videoURL = response;
		var displayOut;
		if (videoURL == "null") {
			displayOut = "No video URL was found on this page. This doesn't mean that there isn't one, just that the extension was not able to scrape a link off of the page."
		} else {
			displayOut = "<a id='link' target='_blank' href='" + videoURL + "'>" + videoURL + "</a><br/><br/><button id='trigger' type='button'>Download file</button><br/><br/><video src='" + videoURL + "' controls>Video.</video>"
		}
		document.getElementById("out").innerHTML = displayOut;
		if (videoURL != "null") {
			document.getElementById("trigger").addEventListener("click", downloadVideo)
		}
    });
	port.postMessage(null);
});
}

window.addEventListener('load', (event) => {
  chrome.tabs.executeScript(null, {file: 'content.js'}, comURL()
  );
});