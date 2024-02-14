const getDelay = (timeout)=>new Promise(resolve=>setTimeout(resolve,timeout));

async function showColor(boxes){
    for(let i=0;i<boxes.length;i++){
          await getDelay(2000);
          boxes[i].style.backgroundColor= 'green';  
    }
    await getDelay(2000);
    for(let i=boxes.length;i>-1;i--){
          await getDelay(2000);
          boxes[i].style.backgroundColor= 'white';  
    }
        
}
document.body.innerHTML = Array(12).join("<div>test</div>");
const boxes = document.body.children;
showColor(boxes);
