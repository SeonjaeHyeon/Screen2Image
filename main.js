/*
Code from here: https://minaminaworld.tistory.com/89
*/

function bodyShot() {
    //전체 스크린 샷하기
    html2canvas(document.body)
    //document에서 body 부분을 스크린샷을 함.
    .then(
        function (canvas) {

        //appendchild 부분을 주석을 풀게 되면 body
        //document.body.appendChild(canvas);

        //특별부록 파일 저장하기 위한 부분.
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
        urls[i] = images[i].getAttribute('src')
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
