// ==UserScript==
// @name         youtube replace by local music if present
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// @run-at      document-start
// ==/UserScript==

function exec() {
    'use strict';
    debugger;

    function isEqAlpha(str, str2){
       str = str.split("").filter(function(c){
          return c.toLowerCase() != c.toUpperCase();
       }).join("");
       str2 = str2.split("").filter(function(c){
          return c.toLowerCase() != c.toUpperCase();
       }).join("");
       return str.score(str2) > 0.8;
    }

     function getLinkFromEl(el,txt){
	var retA = [].filter.call(el.getElementsByTagName("a"), function(a){
		return isEqAlpha(a.innerHTML.slice(0, -4), txt);
	});
	return retA[0];
}

function getAudio(txt, cb){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var div  = document.createElement("div");
			div.innerHTML = xhttp.responseText;
			var ln = getLinkFromEl(div, txt);
			if(ln) {
				cb(null, "http://localhost:7000/" + ln.href.split("/").pop());
			} else {
				cb(new Error("not found"));
			}
//           } else if(this.readyState === 4){
//               cb(new Error("req failed. start server as http-server -p 7000 --cors"));
		}
	};
	xhttp.open("GET", "http://localhost:7000?cachebreak="+Date.now(), true);
	xhttp.send();
}

function main(){
	var st = document.getElementsByTagName("yt-formatted-string")[1].innerText;
	getAudio(st, function(err, res){
		if(err){
			var storageLabel = "downTriggered"+st;
			if(!localStorage[storageLabel]){
				trigDownload();
				localStorage[storageLabel] = "true";
				setTimeout(function(){
					delete localStorage[storageLabel];
				}, 2 * 60 * 1000);
			}

			setTimeout(main, 2000);
			return;
		}
		replVid(res);
	});
}

function replVid(res) {
	var str = '<video controls="" autoplay="true" id="audioPlayerYt" cautoplay="" name="media"><source src="$$$$" type="audio/mpeg"></video>';
	str = str.split("$$$$").join(res);
//     var pl = document.getElementsByClassName("html5-main-video")[0];
// 	pl.pause();
	document.getElementById("primary").innerHTML = ""

	var aud = document.createElement("video");
	document.body.appendChild(aud);
	aud.outerHTML = str;
    aud.play();
	setTimeout(function(){
		aud = document.getElementById("audioPlayerYt");
		aud.style = "left: 300px; top: 400px;postion:absolute";
	}, 1000);
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function trigDownload(){
    var add = "https://www.convertmp3.io/widget/button/?video="+location.href+"&triggerDownload=true"; var fr = document.createElement("iframe"); fr.src = add; document.body.appendChild(fr); fr.style.position = "absolute"; fr.style.top = "0px"; fr.style.left = "1px";  setTimeout("document.body.removeChild(fr)", 20000);
}
main();
// replVid("http://localhost:7000/Fabio%20Vee%20-%20Feelings%20(Original%20Mix)%20%5BVideo%20Edit%5D.mp3");
    // Your code here...
};
window.onload = function(){
  setTimeout(exec, 2000);
}

String.prototype.score = function (word, fuzziness) {
  'use strict';

  // If the string is equal to the word, perfect match.
  if (this === word) { return 1; }

  //if it's not a perfect match and is empty return 0
  if (word === "") { return 0; }

  var runningScore = 0,
      charScore,
      finalScore,
      string = this,
      lString = string.toLowerCase(),
      strLength = string.length,
      lWord = word.toLowerCase(),
      wordLength = word.length,
      idxOf,
      startAt = 0,
      fuzzies = 1,
      fuzzyFactor,
      i;

  // Cache fuzzyFactor for speed increase
  if (fuzziness) { fuzzyFactor = 1 - fuzziness; }

  // Walk through word and add up scores.
  // Code duplication occurs to prevent checking fuzziness inside for loop
  if (fuzziness) {
    for (i = 0; i < wordLength; i+=1) {

      // Find next first case-insensitive match of a character.
      idxOf = lString.indexOf(lWord[i], startAt);

      if (idxOf === -1) {
        fuzzies += fuzzyFactor;
      } else {
        if (startAt === idxOf) {
          // Consecutive letter & start-of-string Bonus
          charScore = 0.7;
        } else {
          charScore = 0.1;

          // Acronym Bonus
          // Weighing Logic: Typing the first character of an acronym is as if you
          // preceded it with two perfect character matches.
          if (string[idxOf - 1] === ' ') { charScore += 0.8; }
        }

        // Same case bonus.
        if (string[idxOf] === word[i]) { charScore += 0.1; }

        // Update scores and startAt position for next round of indexOf
        runningScore += charScore;
        startAt = idxOf + 1;
      }
    }
  } else {
    for (i = 0; i < wordLength; i+=1) {
      idxOf = lString.indexOf(lWord[i], startAt);
      if (-1 === idxOf) { return 0; }

      if (startAt === idxOf) {
        charScore = 0.7;
      } else {
        charScore = 0.1;
        if (string[idxOf - 1] === ' ') { charScore += 0.8; }
      }
      if (string[idxOf] === word[i]) { charScore += 0.1; }
      runningScore += charScore;
      startAt = idxOf + 1;
    }
  }

  // Reduce penalty for longer strings.
  finalScore = 0.5 * (runningScore / strLength    + runningScore / wordLength) / fuzzies;

  if ((lWord[0] === lString[0]) && (finalScore < 0.85)) {
    finalScore += 0.15;
  }

  return finalScore;
};
