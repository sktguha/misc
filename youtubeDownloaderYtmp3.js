// javascript:window.open('https://www.easymp3converter.com/?url='+location.href,'','width=,height=,resizable=no');
/* 
var certainQuery = (q) => new Promise(res=> { function fn(){ var el = document.querySelectorAll(q); if(el.length > 0) { res(el); } else setTimeout(fn,700) } fn(); })
certainQuery('#video_types').then((el)=>{
   var op = el[0].querySelector('option');
    var a = document.createElement('a');
    a.href = op.getAttribute('data-link');
    a.click()
}) 
*/

// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.easymp3converter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
   document.getElementById('search_txt').value = location.href.split("?url=")[1];
setTimeout(()=>{ 
document.getElementById('btn-submit').click();
const fn = ()=>{
//  debugger;
 var sel = document.getElementById('video_types');
 if(!sel){ setTimeout(fn,700); return;}
//  debugger;
 var link = sel.getElementsByTagName('option')[0].getAttribute('data-link');
 var a = document.createElement("a");
 a.href = link;
 a.click()
    setTimeout(()=>window.close(),5000);
};
 fn();
}, 600);

    // Your code here...
})();
