function setCookie(cname, cvalue, exdays,path) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    var pathString='path='+path;
    document.cookie = cname + '=' + cvalue + '; ' + expires+path;
}