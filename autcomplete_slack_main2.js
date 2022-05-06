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


let dict;
function main(){
    const menuStyle = "margin-left:5px; font-size:17px;font-style: italic; font-weight:lighter";
    let menu = document.createElement("div");
    menu.innerText = "autocomplete initialised";
    menu.style = "position:relative;"
    let edtCtr = document.querySelector('.p-message_pane_input');
    let edt = edtCtr.querySelector('.ql-editor');
    let finalDomEdt = edt.firstChild;
    document.querySelector('.p-message_input_field').prepend(menu);
    let currWords = [];
    let idx = 0;
    let currWlen = 0;
    const max_limit = 12;
    var measureDiv = document.createElement("div");
    document.body.appendChild(measureDiv);
    measureDiv.style = "position: absolute; visibility: hidden; height: auto; width: auto; white-space: nowrap;";

    function getWidth(text, fontSize = 15){
        const d = measureDiv;
        var test = d;
        d.innerText = text;
        test.style.fontSize = fontSize;
        var height = (test.clientHeight + 1) + "px";
        var width = (test.clientWidth + 1) + "px"
        return width;
    }

    let latId;
    function findC(text){
        let arr = text.split(/[\W_]+/g);
        let word = arr.pop();
        let reqText = arr.join(" ");
        const banned = ["penis", "vagina","BDSM", "bdsm", "porn"];
        const lbl = performance.now();
        latId = lbl;
        return fetch("http://localhost:9000/?text="+reqText)
        .then(response => response.text()).then(resp=>{
          if(latId !== lbl) throw new Error("old");
          return resp;
        })
        .then(resp=>
              resp
              .slice(1,-1)
              .split(",")
              .map(s=>s.trim().slice(1,-1))
              .concat([...new Set(dict.filter(dictWord=>dictWord.startsWith(word) && banned.indexOf(dictWord) === -1))])
              .filter(wd=>wd.startsWith(word) && wd.trim().length>0)
              .map(wd=>wd.slice(word.length))
              .slice(0,9)
        ).then(ret=>!ret.length ? [' ']:ret);
      // list of banned words
      //const banned = ["penis", "vagina","BDSM", "bdsm", "porn"];
      //return [...new Set(dict.filter(dictWord=>dictWord.startsWith(word.toLowerCase()) && banned.indexOf(dictWord) === -1))].slice(0,max_limit);
    }

    function renderMenu(words){
       menu.innerHTML = "";
       const pl = document.querySelector('.ql-editor').lastElementChild;
        const tw = getWidth(pl.innerText).split("px")[0]*1;
       menu.style.left = (Math.min(tw, 1200)-20)+"px";
           //Math.min( (pl.innerText.length * 3), 2000) +"px";
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

    //var renderMenu = debounce(_renderMenu, 48);

    function setCursor() {
            var tag = [...document.querySelector('.ql-editor').getElementsByTagName('p')].pop();

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
          if(currWords[idx]?.trim?.()?.length>0){
            const pl = document.querySelector('.ql-editor').lastElementChild;
            pl.innerHTML = pl.innerHTML +currWords[idx];
            setCursor();
          }
//         finalDomEdt.innerText = textToSet;
//          setTimeout(()=>{finalDomEdt.selectionStart = finalDomEdt.selectionEnd = textToSet.length},1);
       
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
window.onload=()=>setTimeout(main,500);












































dict = JSON.parse(dictString);