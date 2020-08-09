function fullScreen() {
    chrome.tabs.executeScript({
        file: 'html2canvas.js'
    });
    chrome.tabs.executeScript({
        file: 'captureEvent.js'
    });
    chrome.tabs.executeScript({
        code: "html2canvas(document.body).then(function (canvas) { drawImg(canvas.toDataURL('image/png')); saveAs(canvas.toDataURL(), 'file-name.png'); }).catch(function (err) { console.log(err); });"
    });
}

function getImage() {
    chrome.tabs.executeScript({
        file: 'download2.js'
    });
    chrome.tabs.executeScript({
        file: "downloadEvent.js"
    });
}

document.getElementById('img1').onclick = fullScreen;
document.getElementById('img2').onclick = getImage;
