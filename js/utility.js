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




function toTitleCase(str)
{
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function replaceSpaceForSolr(str)
{
	return str.replace(/\s+/g,"\\"+'+');
}

function replacePublicRoot(str)
{
    var myRegexp = /^public:\/\/(.*)$/g;
    var match= myRegexp.exec(str);

    if(match)
    {
        return match[1];
    }

    else
    {
        return '';
    }
}

function titleToRtf(title)
{
    var string= '\\b'+title+'\\b0\\par';
    return string;
}

function linkToRtf(uri)
{
    var string='{\\*\\generator Msftedit 5.41.21.2509;}\\viewkind4\\uc1\\pard\\sa200\\sl276\\slmult1\\lang9\\f0\\fs22{\\field{\\*\\fldinst{HYPERLINK '+rootURL+mainPort+'/drupal/sites/default/files/'+replacePublicRoot(uri)+'}}{\\fldrslt{\\ul\\cf1 '+rootURL+mainPort+'/drupal/sites/default/files/'+replacePublicRoot(uri)+'}}}\\f0\\fs22\\par\\par';

    return string;
}