setInterval(()=>{
   [...document.querySelectorAll('.i0jNr')].filter(el =>el.className === 'i0jNr').forEach(el=>{ let arr = el.innerText.split('/'); if(!(arr[0] && arr[1] && arr[2])) return; el.innerText = arr[1]+'/'+arr[0]+'/'+arr[2] + ' IST'; el.classList.add('done') }) 2
}, 1000);
