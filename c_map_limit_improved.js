const getNameByIdHelper = (id, callback) => setTimeout(() =>{ callback("User" + id); console.log("ran "+id);}, 1500);

async function mapLimit(inputs, limit, iterateeFn, callback) {
    const res = {};
    for(let i=0;i<inputs.length;i=i+limit){
        const inpArr = inputs.slice(i,i+limit);
        await Promise.all(inpArr.map((input, index)=>new Promise(resolve=>{
            iterateeFn(input, (result)=>{
                res[i+index] = result;
                resolve();
            });
        })));
    }
    callback(res);
}

mapLimit([1,2,3,4,5], 2, getNameByIdHelper, (allResults) => console.log('output:', allResults));
