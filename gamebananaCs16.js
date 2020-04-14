let arr = [...document.getElementsByClassName("Name")].filter(elem => elem.innerText.startsWith("he"));

var dl = (map => {
    let id = map.href.split("/").pop();
    let link = "https://gamebanana.com/maps/download/" + id;
     httpGet(link, function(html){
        dv = document.createElement("div");
        dv.innerHTML = html;
        let a = dv.getElementsByClassName("MiscIcon SmallManualDownloadIcon")[0].parentElement
        a.click();  
     });  
})
    
function httpGet(theUrl,cb)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            cb(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();    
}

ct = 0;
setInterval(()=>{
    ct ++;
    if(!arr[ct]) return;
    dl(arr[ct])
}, 1000);
