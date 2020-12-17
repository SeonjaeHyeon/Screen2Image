/*
Code from here: https://minaminaworld.tistory.com/89
*/

function bodyShot() {
    html2canvas(document.body)
    .then(
        function (canvas) {
            var fname = 'screenshot-' + window.location.hostname + '-' + document.title + '.png';

            saveAs(canvas.toDataURL(), fname);
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

        urls[i] = toAbsolute(url);
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

            urls.push(toAbsolute(url));
        }
    }

    return urls;
}

// https://stackoverflow.com/a/14781678
function toAbsolute(url) {
    var link = document.createElement("a");
    link.href = url;
    return link.href;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text && (msg.text == "full_screen")) {
        bodyShot();
    }
    else if (msg.text && (msg.text == "get_image")) {
        sendResponse(loadImage());
    }
});
