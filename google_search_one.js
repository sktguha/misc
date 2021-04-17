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
             location.href= 'https://www.google.com/search?q='+(Number(sp)*(62+20)) + ' dollars in rupees';
             return;
         }
         var tot = Number(3192000+319200+Number(document.querySelector('.DFlfde.SwHCTb').dataset.value));
         var dispText = ' id:'+tot+' '+Number(0.7*tot)+' '+Number((0.7*tot)-(19800*12 + 100000));
         alert(dispText);
         var info = document.querySelector('.txJRaf');
         if(!info) return;
         info.innerText += dispText;

         info.style.zoom = 1.6;
         info.onclick = ()=>location.href='https://www.google.com/search?q=salesforce+share+price';
         info.oncontextmenu = ()=>window.open('https://www.google.com/search?q=salesforce+share+price');
     }
    // Your code here...
})();
