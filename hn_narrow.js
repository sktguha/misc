// ==UserScript==
// @name         Narrow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://news.ycombinator.com/item*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ycombinator.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(location.href.toString().indexOf('ijsandjsadndaajkdskjsad')!==-1) return;
     let fr = document.createElement('iframe');
    fr.src = location.href+'&ijsandjsadndaajkdskjsad'; document.body.innerHTML = ""; document.body.appendChild(fr); 
    fr.style.marginLeft = '10%'
    fr.style.width = '65%'; fr.style.height='100%'; void 0;
    // Your code here...
})();
