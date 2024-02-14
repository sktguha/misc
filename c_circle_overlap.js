document.body.innerHTML = "";
function drawCircle(a, b){
    const mid0 = (a[0]+b[0])/2;
    const mid1 = (a[1]+b[1])/2;
    const dis0 = a[0]-b[0];
    const dis1 = a[1]-b[1];
    const dist = Math.sqrt((dis0*dis0) + (dis1+dis1));
    const dv = document.createElement("div");
    dv.style.height = "2px";
    dv.style.left = (mid0 - (dist/2))+"px";
    dv.style.top = mid1+"px";
    dv.style.width = dist+"px";
    dv.style.position = "absolute";
    dv.style.backgroundColor = "red";
    document.body.appendChild(dv);

    for(let i=0;i<=360;i++){
        dv.style.transform = `rotate(${i}deg)`;
        const { top, right , bottom, left} = dv.getBoundingClientRect();
        drawPoint(top, left);
        drawPoint(right, bottom);
    }
}

function drawPoint(x,y){
    const dv = document.createElement("div");
    dv.style.height = "2px";
    dv.style.left = x+"px";
    dv.style.top = y+"px";
    dv.style.width = "2px";
    dv.style.position = "absolute";
    dv.style.backgroundColor = "blue";
    document.body.appendChild(dv);
}

drawCircle([20,20], [200,200]);
document.body.onmouseup = (e)=>{
    alert("hi");
}
