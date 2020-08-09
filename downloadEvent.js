var images = document.getElementsByTagName('img');
var d_type = 'image/png'
for (var i = 0; i < images.length; i++) {
    alert(images[i].getAttribute('src'));
    var names = images[i].getAttribute('src').split('/');
    var x = new XMLHttpRequest();
                x.open("GET", images[i].getAttribute('src'), true);
                x.responseType = 'blob';
                x.onload=function(e){download(x.response, names[names.length - 1], d_type);}
                x.send();
}