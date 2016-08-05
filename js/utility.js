function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    // var pathString='path='+path;
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function getCookie(cname)
{
    var name = cname + "=";
    var cookieArray = document.cookie.split(';');
    for(var i = 0; i <cookieArray.length; i++) {
        var c = cookieArray[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);       //remove space
        }
        if (c.indexOf(name)=== 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
