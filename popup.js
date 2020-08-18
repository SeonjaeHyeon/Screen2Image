function fullScreen() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "full_screen" });
    });
}

function downloadImage(imgUrl) {
    chrome.downloads.download({url: imgUrl});
}

function getImageSize(src, tag) { 
    // Get original size of image
    // https://sheerheart.tistory.com/entry/JavaScript-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%82%AC%EC%9D%B4%EC%A6%88-%EA%B5%AC%ED%95%98%EA%B8%B0
    var img = new Image();

    img.onload = function() {
        tag.innerText = this.width + 'x' + this.height;
    }

    img.src = src;
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

        newTdInfo.appendChild(newInputInfo); // https://stackoverflow.com/questions/54615835/javascript-createelement-and-append-child-node
        newTdInfo.append(' '); // https://wrkbr.tistory.com/563
        newTdInfo.appendChild(newImgInfo);
        newTrInfo.appendChild(newTdInfo);

        if (index % 2 == 0) {
            var newTr = document.createElement('tr');
            document.getElementById('table1').appendChild(newTr);
        }

        var newTd = document.createElement('td');
        newTd.setAttribute('style', 'width: 123px; height: 141px;');

        var newImg = document.createElement('img');
        newImg.setAttribute('id', 'img' + index);
        newImg.setAttribute('src', urls[i]);
        newImg.setAttribute('style', 'min-width: 35px; max-width: 123px; height: auto; cursor: pointer;');
        newImg.setAttribute('title', 'Open image in a new tab.');
        newImg.onclick = function() {
            // Open url in a new tab: https://developer.chrome.com/extensions/tabs#method-create
            chrome.tabs.create({ url: this.getAttribute('src')});
        }

        var newDiv = document.createElement('div');
        newDiv.setAttribute('style', 'color: #808080; font-size: 13px; font-weight: bold;');

        getImageSize(urls[i], newDiv);

        newTd.appendChild(newImg);
        newTd.appendChild(newDiv);
        newTr.appendChild(newTd);

        index++;
    }
}

function filterImage(filter) {
    var fTable = document.getElementById('table1');
    var fTd = fTable.getElementsByTagName('td');

    for(var i = 0; i < fTd.length; i++) {
        fTd[i].style.display = ""; // display:none : https://unabated.tistory.com/entry/displaynone-%EA%B3%BC-visibilityhidden-%EC%9D%98-%EC%B0%A8%EC%9D%B4
    }

    for(var i = 0; i < fTd.length; i++) {
        var fImg = fTd[i].getElementsByTagName('img')[0];

        if (fImg.hasAttribute('id') && !fImg.getAttribute('src').includes(filter)) {
            fTd[i].style.display = "none";
        }
        else if (fImg.hasAttribute('data-url') && !fImg.getAttribute('data-url').includes(filter)) {
            fTd[i].style.display = "none";
        }
    }
}

function getImage() {
    document.getElementById('div1').innerHTML = "";

    var newP = document.createElement('p');
    newP.setAttribute('style', 'margin-top: -7px;');
    var newP2 = document.createElement('p');
    newP2.setAttribute('style', 'margin-top: -8px;');

    var newInputFilter = document.createElement('input');
    newInputFilter.setAttribute('type', 'text');
    newInputFilter.setAttribute('id', 'filter_input');
    newInputFilter.setAttribute('style', 'width: 250px;')
    newInputFilter.setAttribute('placeholder', 'FILTER BY URL');
    newInputFilter.oninput = function() { // oninput Event: https://www.w3schools.com/tags/ev_oninput.asp
        filterImage(this.value); // this.getAttribute('value') is null
    }
    document.getElementById('div1').appendChild(newInputFilter);
    document.getElementById('div1').appendChild(newP);

    var newButton = document.createElement('button');
    newButton.setAttribute('type', 'button');
    newButton.innerText = 'Download All';
    newButton.onclick = function() {
        var bImages = document.getElementsByTagName('table')[0].getElementsByTagName('img');

        for(var i = 0; i < bImages.length; i++) {
            if (bImages[i].hasAttribute('id')) { // hasAttribute: https://www.jkun.net/532
                downloadImage(bImages[i].getAttribute('src'));
            }
        }
    }
    document.getElementById('div1').appendChild(newButton);
    document.getElementById('div1').appendChild(newP2);

    var newTable = document.createElement('table');
    newTable.setAttribute('id', 'table1');
    newTable.setAttribute('border', '1');
    newTable.setAttribute('bordercolor', '#ddd'); // https://aboooks.tistory.com/77
    newTable.setAttribute('frame', 'void'); // table's outer line: https://blog.naver.com/ryopho/130172800002
    document.getElementById('div1').appendChild(newTable);


    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "get_image" }, insertImage);
    });
}

document.getElementById('img1').onclick = fullScreen;
document.getElementById('img2').onclick = getImage;
