function fullScreen() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "full_screen" });
    });
}

function downloadImage(urls) {
	for(var i = 0; i < urls.length; i++) {
		chrome.downloads.download({url: urls[i]});
	}
}

function getImage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "get_image" }, downloadImage);
    });
}

document.getElementById('img1').onclick = fullScreen;
document.getElementById('img2').onclick = getImage;
