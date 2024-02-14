

  document.body.innerHTML = '<button onclick="addMore()">Add</button><div id="progress-bars"></div>';

  const getDelay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

  let curr = 0;
  let alreadyRunning = false;

  function addMore() {
    curr++;
    if (!alreadyRunning) {
      showNewBar();
    }
  }

  async function showNewBar() {
    alreadyRunning = true;
    const div = document.createElement("div");
    document.getElementById("progress-bars").appendChild(div);
    div.style.height = "20px";
    for (let i = 0; i < 100; i++) {
      await getDelay(100);
      div.style.width = i + "px";
      div.style.backgroundColor = 'green';
    }
    alreadyRunning = false;
    if (curr > 0) {
      curr--;
      showNewBar();
    }
  }

