function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;
  console.log("I am called ", id);
  setTimeout(() => {
    console.log("call ended ", id);
    callback("User" + id)
  }, randomRequestTime);
}

mapLimit([1,2,3,4,5], 2, getNameById, (allResults) => {
  console.log('output:', allResults) // ["User1", "User2", "User3", "User4", "User5"]
})

async function mapLimit(inputs, limit, iterateeFn, callback) {
  // implement here
    const res = {};
    for(let i=0;i<inputs.length;i=i+limit){
        const inpArr = inputs.slice(i,i+limit);
        await new Promise((resolve)=>{
            let doneCt = 0;
            inpArr.forEach((inp, index)=>iterateeFn(inp, (result)=>{
                res[i+index] = result;
                doneCt ++;
                if(doneCt === inpArr.length){
                    resolve();
                }
            })) 
        });
        // console.log(inpArr);
    }
    console.log(res);
}
