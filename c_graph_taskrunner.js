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

// can be done in reverse direction also ( greedy method) , find all which have dependencies, then have a running lock to prevent double runs
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
        // here we need similar to map variable an alreadyRunning flag to prevent double runs of a task
        // if(alreadyRunning[taskKey]) {  
        //  this is bit more complicated, below code needs to come in the alreadyRunning.then(()=>{ block actually, same the task runner below needs to set 
        //  alreadyRunning promise variable and resolve it and then clear the delete alreadyRunning[taskKey]
        //  ct++; 
        //  if(ct === executableTasks.length){
        //    runAsyncGraph(graph, map, alreadyRunning, finalCallback); // add in arguments list as well as below pass it on and also in onDone after line 69 
        //    before 70 add alreadyRunning[taskKey] = false
        //  }}
        //    return;
        // }
        graph[taskKey].task(()=>{
            map[taskKey] = true;
            ct++;
            if(ct === executableTasks.length){
                runAsyncGraph(graph, map, finalCallback);
            }
        }) 
    })
}
