// ==UserScript==
// @name         Linkedin view votes ratio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.linkedin.com/in/sktguha/detail/recent-activity/shares/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     window.onload= ()=>{
        setInterval(()=>
         document.querySelectorAll('.occludable-update').forEach(dv=>{
            let ns = dv.querySelector('.feed-shared-actor__name').firstElementChild;
            if(ns.innerText.indexOf('%')!== -1) return;
            let views = dv.getElementsByTagName('Strong')[0].innerText.split(' ')[0];
            views = parseInt(views.split(",").join(""))
            let votes = dv.querySelector('.social-details-social-counts__reactions-count');
            let ve = votes;
            votes = votes ? votes.innerText*1:0;
            let per =  parseFloat((votes/views)*100).toFixed(3) + '%';
            ns.innerText = ns.innerText.indexOf('%')=== -1 ? ns.innerText+' '+per: ns.innerText;
        }),1000)
     }
    // Your code here...
})();
