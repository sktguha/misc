

  document.body.innerHTML = '<button onclick="addMore()">Add</button><div id="progress-bars"></div>';

  const getDelay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

  let curr = 0;
  let currRunning = 0;

  function addMore() {
    curr++;
    if (currRunning < 3) {
      currRunning ++;
      showNewBar();
    }
  }

  async function showBarTimes(n){
      for(let i=0;i<n;i++){
          showNewBar();
      }
  }

  async function showNewBar() {
    const div = document.createElement("div");
    document.getElementById("progress-bars").appendChild(div);
    div.style.height = "20px";
    for (let i = 0; i < 100; i++) {
      await getDelay(100);
      div.style.width = i + "px";
      div.style.backgroundColor = 'green';
    }
    if(currRunning > 0) currRunning--;
    if(curr > 0) curr--;
    if(currRunning === 0 && curr > 0 ){
        // nextRunsTodo concept simplifies a lot the code
        const nextRunsTodo = curr > 3 ? 3: curr;
        currRunning = nextRunsTodo;
        curr = curr - nextRunsTodo;
        showBarTimes(nextRunsTodo);
    }
  }

