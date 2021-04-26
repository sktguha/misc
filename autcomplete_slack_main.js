// ==UserScript==
// @name         slack autocomplete
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.slack.com/client/*
// @icon         https://www.google.com/s2/favicons?domain=slack.com
// @grant        none
// ==/UserScript==



function main(){
    const menuStyle = "margin-left:5px; font-size:17px;font-style: italic;";
    let menu = document.createElement("div");
    menu.innerText = "autocomplete initialised";
    let edtCtr = document.querySelector('.p-message_pane_input');
    let edt = edtCtr.querySelector('.ql-editor');
    let finalDomEdt = edt.firstChild;
    document.querySelector('.p-message_input_field').prepend(menu);
    let currWords = [];
    let idx = 0;
    let currWlen = 0;
    const max_limit = 12;
    function findC(text){
        let arr = text.split(/[\W_]+/g);
        let word = arr.pop();
        let reqText = arr.join(" ");
        return fetch("http://localhost:9000/?text="+reqText)
        .then(response => response.text()).then(resp=>resp.slice(1,-1).split(",").map(s=>s.trim().slice(1,-1)).filter(wd=>wd.startsWith(word)).map(wd=>wd.slice(word.length)).slice(0,15));
      // list of banned words
      //const banned = ["sex", "penis", "vagina","BDSM", "bdsm", "porn"];
      //return [...new Set(dict.filter(dictWord=>dictWord.startsWith(word.toLowerCase()) && banned.indexOf(dictWord) === -1))].slice(0,max_limit);
    }

    function renderMenu(words){
       menu.innerHTML = "";
       words.forEach((word,i) => {
           let sp = document.createElement("span");
           //sp.innerText = (idx===i?"-->":"") + word;
           sp.innerText = `(${i+1}): ${word}`;
           sp.style = menuStyle;
           menu.appendChild(sp);
       });
       currWords = words;
       currWlen = words.length;
    }

    function setCursor() {
            var tag = edt;

            // Creates range object
            var setpos = document.createRange();

            // Creates object for selection
            var set = window.getSelection();

            // Set start position of range
            setpos.setStart(tag, 1);
            setpos.setEnd(tag,1)
            // Collapse range within its boundary points
            // Returns boolean
            setpos.collapse(true);

            // Remove all ranges set
            set.removeAllRanges();

            // Add range with respect to range object.
            set.addRange(setpos);

            // Set cursor on focus
            tag.focus();
        }

    const onKeyDown = (e) => {
      const { key, code } = e;
      console.log(document.activeElement);
      //if((e.metaKey && key === "Enter") || !document.activeElement.classList.contains("ql-editor")) return;

      function refreshMenu(){
        let txt = edt.innerText;
        let word = txt.split(/[\W_]+/g).pop();
        findC(txt).then((words)=>renderMenu(words));
      }

      function selectAndSet(){
        let txt = edt.innerText;
         //let word = txt.split(/[\W_]+/g).pop();
         //const textToSet = txt.slice(0, txt.length-word.length)+currWords[idx];
        document.querySelector('.ql-editor').firstChild.innerText = txt+currWords[idx];
//         finalDomEdt.innerText = textToSet;
//          setTimeout(()=>{finalDomEdt.selectionStart = finalDomEdt.selectionEnd = textToSet.length},1);
        setCursor();
      }
      // TODO: if left or right then refresh from current position/ replace etc
      if(key === "ArrowDown"){
         idx = ( (idx >= currWlen) || (idx >= currWlen-1) ) ? idx : (idx + 1);
         refreshMenu();
         return false;
      } else if (key === "ArrowUp"){
         idx = idx === 0 ? idx : (idx - 1);
         refreshMenu();
         return false;
      } else if (["1","2","3","4","5","6","7","8","9","10"].includes(key)){
         idx = (key*1)-1;
         selectAndSet();
         e.stopPropagation();
         e.preventDefault();
         return false;
      }
      idx = 0;
      setTimeout(refreshMenu,1);
    }
//     document.onkeydown = onKeyDown;
      document.addEventListener("keydown", onKeyDown, true);
}
window.onload=()=>setTimeout(main,1500);
