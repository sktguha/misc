// ==UserScript==
// @name         google search one
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/search?*
// @grant        none
// ==/UserScript==

//This is private and personal. please don't share with anyone
(function() {
    'use strict';
     window.onload = ()=>{
         if(location.href.startsWith('https://www.google.com/search?q=salesforce+stock&')){
             var $ = document.querySelector.bind(document);
             var sp = $('span[jsname="vWLAgc"]').innerText;
             $('.gLFyf.gsfi').value = (Number(sp)*251)/4 + ' dollars in rupees';
             $('.Tg7LZd').click();
             return;
         }
       var info = document.querySelector('.txJRaf');
         if(!info) return;
         info.innerText += ' id:'+Number(2800000+280000+Number(document.querySelector('.DFlfde.SwHCTb').dataset.value));
         info.style.zoom = 1.6;
         info.onclick = ()=>location.href='https://www.google.com/search?q=salesforce+share+price';
         info.oncontextmenu = ()=>window.open('https://www.google.com/search?q=salesforce+share+price');
     }
    // Your code here...
})();
