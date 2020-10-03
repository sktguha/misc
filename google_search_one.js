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
             location.href= 'https://www.google.com/search?q='+((Number(sp)*251)/4) + ' dollars in rupees';
             return;
         }
       var info = document.querySelector('.txJRaf');
         if(!info) return;
         var tot = Number(2800000+280000+Number(document.querySelector('.DFlfde.SwHCTb').dataset.value));
         info.innerText += ' id:'+tot+' '+Number(0.7*tot)+' '+Number((0.7*tot)-(19800*12 + 100000));
         info.style.zoom = 1.6;
         info.onclick = ()=>location.href='https://www.google.com/search?q=salesforce+share+price';
         info.oncontextmenu = ()=>window.open('https://www.google.com/search?q=salesforce+share+price');
     }
    // Your code here...
})();
