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

    // Remove duplicates: https://medium.com/@Dongmin_Jang/javascript-array-%EC%A4%91%EB%B3%B5-%EC%A0%9C%EA%B1%B0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-es6-b5b9075361f9
    urls = Array.from(new Set(urls));

    for(var i = 0; i < urls.length; i++) {
        if (urls[i] == '') {
            continue;
        }

        if (index % 2 == 0) {
            var newTrInfo = document.createElement('tr');
            document.getElementById('table1').appendChild(newTrInfo);
        }

        var newTdInfo = document.createElement('td');
        newTdInfo.setAttribute('style', 'width: 123px; height: 21px');

        var newInputInfo = document.createElement('input');
        newInputInfo.setAttribute('type', 'text');
        newInputInfo.setAttribute('style', 'width: 95px'); // newInput.setAttribute('width', '120px') is not working: https://stackoverflow.com/a/6699659
        newInputInfo.setAttribute('value', urls[i]);
        newInputInfo.setAttribute('readonly', '');
        newInputInfo.onclick = function() {
            this.select(); // https://stackoverflow.com/questions/4067469/selecting-all-text-in-html-text-input-when-clicked
        }

        var newImgInfo = document.createElement('img');
        newImgInfo.setAttribute('src', 'download.png');
        newImgInfo.setAttribute('style', 'width: 15px; height: 15px; cursor: pointer;'); // cusor pointer: https://live8.tistory.com/175
        newImgInfo.setAttribute('data-url', urls[i]);
        newImgInfo.onclick = function() {
            downloadImage(this.getAttribute('data-url')); // About 'this': https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb
        }

        // newTdInfo.innerHTML = newInputInfo.outerHTML + ' ' + newImgInfo.outerHTML;
        //newTrInfo.innerHTML += newTdInfo.outerHTML;

        newTdInfo.appendChild(newInputInfo); // https://stackoverflow.com/questions/54615835/javascript-createelement-and-append-child-node
        //newTdInfo.appendChild(document.createTextNode(' ')); // https://stackoverflow.com/questions/54615835/javascript-createelement-and-append-child-node
        newTdInfo.append(' '); // https://wrkbr.tistory.com/563
        newTdInfo.appendChild(newImgInfo);
        newTrInfo.appendChild(newTdInfo);

        if (index % 2 == 0) {
            var newTr = document.createElement('tr');
            document.getElementById('table1').appendChild(newTr);
        }

        var newTd = document.createElement('td');
        newTd.setAttribute('style', 'width: 123px; height: 120px;');

        var newImg = document.createElement('img');
        newImg.setAttribute('id', 'img' + index);
        newImg.setAttribute('src', urls[i]);
        newImg.setAttribute('style', 'max-width: 123px; height: auto;'); 
        
        newTd.innerHTML = newImg.outerHTML;
        newTr.innerHTML += newTd.outerHTML;

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
