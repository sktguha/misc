function taskA(done) {
  console.log("Task A Completed");
  done();
}
function taskB(done) {
  setTimeout(function () {
    console.log("Task B Completed");
    done();
  }, 2000);
}
function taskC(done) {
  setTimeout(function () {
    console.log("Task C Completed");
    done();
  }, 200);
}
function taskD(done) {
  console.log("Task D Completed");
  done();
}
function taskE(done) {
  console.log("Task E Completed");
  done();
}

const asyncGraph = {
  a: {
    task: taskA,
  },
  b: {
    task: taskB,
  },
  c: {
    task: taskC,
  },
  d: {
    dependency: ["a", "b"],
    task: taskD,
  },
  e: {
    dependency: ["c", "d"],
    task: taskE,
  },
};
runAsyncGraph(asyncGraph, {}, ()=>{ console.log("finally done"); })


function runAsyncGraph(graph, map, finalCallback) {
  // implement
    const notDoneTasks = Object.keys(graph).filter((key)=>!map[key]);
    if(!notDoneTasks.length){
        finalCallback();
        return;
    }
    const executableTasks = notDoneTasks.filter(taskKey => (graph[taskKey].dependency || []).every(dep=>map[dep]));
    let ct=0;
    executableTasks.forEach((taskKey)=>{
        graph[taskKey].task(()=>{
            map[taskKey] = true;
            ct++;
            if(ct === executableTasks.length){
                runAsyncGraph(graph, map, finalCallback);
            }
        }) 
    })
}
