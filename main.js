/*
Code from here: https://minaminaworld.tistory.com/89
*/

function bodyShot() {
    html2canvas(document.body)
    .then(
        function (canvas) {

        saveAs(canvas.toDataURL(), 'file-name.png');
        }).catch(function (err) {
            console.log(err);
        });
}

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

function loadImage() {
    var images = document.getElementsByTagName('img');
    var urls = new Array;

    for (var i = 0; i < images.length; i++) {
        var url = images[i].getAttribute('src');
        if (url == null) {
            continue;
        }

        urls[i] = url;
    }

    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentDocument == null) {
            continue;
        }

        images = iframes[i].contentDocument.getElementsByTagName('img');
        for (var j = 0; j < images.length; j++) {
            var url = images[j].getAttribute('src');
            if (url == null) {
                continue;
            }

            urls.push(url);
        }
    }

    for(var i = 0; i < urls.length; i++) {
        var url = urls[i];
        if (url.indexOf('https://') != 0 && url.indexOf('http://') != 0 && url.indexOf('/') == 0) {
            url = 'https://' + window.location.hostname + url;
        }

        urls[i] = url;
    }
    
    return urls;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text && (msg.text == "full_screen")) {
        bodyShot();
    }
    else if (msg.text && (msg.text == "get_image")) {
        sendResponse(loadImage());
    }
});
