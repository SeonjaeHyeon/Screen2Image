function fullScreen() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "full_screen" });
    });
}

function downloadImage(imgUrl) {
    chrome.downloads.download({url: imgUrl});
}

function insertImage(urls) {
    var index = 0;

    for(var i = 0; i < urls.length; i++) {
        /*
        var newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'frame' + i)
        newDiv.setAttribute('width', '120px');
        newDiv.setAttribute('height', 'auto');
        document.getElementById('div1').appendChild(newDiv);

        var newImg = document.createElement('img');
        newImg.setAttribute('src', urls[i]);
        newImg.setAttribute('style', 'max-width: 120px; height: auto;')
        newImg.setAttribute('onclick', 'javascript:downloadImage(' + urls[i] + ')');
        document.getElementById('frame' + i).appendChild(newImg);
        */

        if (urls[i] == '') {
            continue;
        }

        var newImg = document.createElement('img');
        newImg.setAttribute('id', 'img' + index);
        newImg.setAttribute('src', urls[i]);
        newImg.setAttribute('style', 'max-width: 120px; height: auto; cursor: pointer;')
        // newImg.setAttribute('onclick', 'javascript:downloadImage(' + urls[i] + ')');
        document.getElementById('div1').appendChild(newImg);
        document.getElementById('img' + index).onclick = function() {
            downloadImage(this.getAttribute('src')); // About 'this': https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb
        }


        if(index % 2 == 0) {
            document.getElementById('div1').appendChild(document.createElement('p'));
        }

        index++;
    }
}

function getImage() {
    document.getElementById('div1').innerHTML = "";

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "get_image" }, insertImage);
    });
}

document.getElementById('img1').onclick = fullScreen;
document.getElementById('img2').onclick = getImage;
