import { useState } from "react"

const getValues = (inp, cb)=>cb ([inp+Math.random(), inp+Math. random(), inp+Math.random()]);

const debounce = (fn, time=2000) => }

let timeout;

return (...args)=>{

if(timeout) clearTimeout (timeout);

timeout = setTimeout(()=>fn(... args), time);

const fn = debounce(getValues);

export default function Dropdown(){

const [inp, setInput] = useState ("");

const [values, setValues] =useState([]);

return <div> eee

}
}
</div>
}



<input onChange={(e)=>{

setInput(e.target.value); 
  fn(e.target.value, 
     (vals)=> { setValues (vals);})

}} value={inp}/>

<div>{values.map(val=><div>

{val}</div>)}</div>
  }
