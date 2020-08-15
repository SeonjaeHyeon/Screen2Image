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
        if (urls[i] == '') {
            continue;
        }

        if (index % 2 == 0) {
            var newTr = document.createElement('tr');
            document.getElementById('table1').appendChild(newTr);
        }

        var newTd = document.createElement('td');
        newTd.setAttribute('style', 'width: 120px; height: 141px;');

        var newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('style', 'width: 120px'); // newInput.setAttribute('width', '120px') is not working: https://stackoverflow.com/a/6699659
        newInput.setAttribute('value', urls[i]);
        newInput.setAttribute('readonly', '');

        var newImg = document.createElement('img');
        newImg.setAttribute('id', 'img' + index);
        newImg.setAttribute('src', urls[i]);
        newImg.setAttribute('style', 'max-width: 120px; height: auto; cursor: pointer;'); // cusor pointer: https://live8.tistory.com/175
        
        newTd.innerHTML = newInput.outerHTML + newImg.outerHTML;
        newTr.innerHTML += newTd.outerHTML;

        document.getElementById('img' + index).onclick = function() {
            downloadImage(this.getAttribute('src')); // About 'this': https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb
        }

        index++;
    }
}

function getImage() {
    document.getElementById('div1').innerHTML = "";
    var newTable = document.createElement('table');
    newTable.setAttribute('id', 'table1');
    newTable.setAttribute('border', '1');
    newTable.setAttribute('bordercolor', '#ddd'); // https://aboooks.tistory.com/77
    newTable.setAttribute('frame', 'void'); // table's outer line: https://blog.naver.com/ryopho/130172800002
    // newTable.setAttribute('rules', 'all'); // table's inner line: https://blog.naver.com/ryopho/130172889946
    document.getElementById('div1').appendChild(newTable);


    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "get_image" }, insertImage);
    });
}

document.getElementById('img1').onclick = fullScreen;
document.getElementById('img2').onclick = getImage;
