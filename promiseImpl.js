class MyPromise {
    constructor(executor) {
        this.list = [];
        var that = this;
        //if upper one is catch need to give to catch one
        executor(function(result){

            that._lastValue = that.list.reduce(that._processResult.bind(that), result);
            that.list = [];
        });
    }
    _isError(e){
        return e instanceof Error
    }
    then(cb){
        var that = this;
        if(that._lastValue){
            that._lastValue = that._processResult(that._lastValue, {
                type : 1,
                fn : cb
            });
            return;
        }
        this.list.push({
            type : 1,
            fn : cb
        });
        return this;
    }
    catch(cb){
        this.list.push({
            type : 2,
            fn : cb
        });
        return this;
    }
    _processResult(res, cb) {
        if(this._isError(res)){
            if(cb.type === 2){
                return cb.fn(res);
            } else {
                return res;
            }
        }

        try {
            return cb.fn(res);
        } catch (e) {
            return e;
        }
    }
    static all(pArr){
        var res = [];
        var ct = 0;
        return new MyPromise(function(resolve){
            pArr.forEach(function (pr,i) {
                pr.then(function (pRes) {
                    res[i] = pRes;
                    ct ++;
                    if(ct === pArr.length){
                        resolve(res);
                    }
                })
            });
        });
    }
}

/* #6 all */
const simpleAll = MyPromise.all([
  new MyPromise(res => res('hello')),
  new MyPromise(res => setTimeout(function(){
      res('world')
  }, 3000
  )),
]);
simpleAll.then(console.log);

// const p1 = new MyPromise(res => {
//   res('hello');
// })
// const p2 = new MyPromise(res => {
//   res('world');
// })
// .then(() => {
//   throw new Error('boom');
// });
// MyPromise.all([p1, p2]).then(console.log).catch(console.error);
