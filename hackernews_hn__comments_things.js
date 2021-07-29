// ==UserScript==
// @name         HN comments hide
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://news.ycombinator.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     function doAcc(){
        window.hf = !window.hf; [...document.querySelectorAll('.ind')].filter(el=> el.firstChild.width !== 0).forEach(td => td.parentElement.style.display =window.hf?"none":"block");
     }
     function att(fn){ try{fn()} catch(e){ console.error(e)}}
     window.onload = ()=>doAcc();
     window.onkeypress = ({key})=>{
       if(key==="e") {
           doAcc();
       } else if(key==="f"){
           att(()=>[...document.getElementsByTagName('a')].filter(a=>a.innerText==='favorite')[0].click());
       } else if(key === "l"){
          document.getElementsByClassName('storylink')[0].target = '_blank'
          document.getElementsByClassName('storylink')[0].click()
       }
     }
    // Your code here...
})();
