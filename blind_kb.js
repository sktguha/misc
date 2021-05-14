// ==UserScript==
// @name         blind kb expand save
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       You
// @match        https://www.teamblind.com/*
// @icon         https://www.google.com/s2/favicons?domain=teamblind.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     window.onload = ()=>{
         let lock = 0;
         document.onkeydown = ({code, ctrlKey})=>{
             if(code==="KeyC"){
                 document.getElementsByClassName('comment_btn')[0].firstElementChild.click()
             } else if (code == "KeyL" && !lock){
                 if(document.getElementsByClassName('btn_save active ing').length > 0 ){
                   if(!window.confirm('already saved. select ok to unsave')){
                      return;
                   }
                 }
                document.getElementsByClassName('btn_save')[0].firstElementChild.click()
                 lock = 1;
                 setTimeout(()=>{ lock = 0}, 5000);
             }
         }
     }
    // Your code here...
})();
