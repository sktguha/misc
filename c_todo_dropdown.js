import React, { useState,

useEffect } from 'react'

import./App.css'

import FileSystem from './

FileSystem'

import { useState } from "react"

const getValues = (inp, cb)=>cb ([inp+Math.random(), inp+Math. random(), inp+Math.random()]);

const debounce = (fn, time=2000) => }

let timeout;

return (...args)=>{

if(timeout) clearTimeout (timeout);

timeout = setTimeout(()=>fn(... args), time);


const fn debounce(getValues);

export default function Dropdown(){

const [inp, setInput] = useState ("");

const [values, setValues] =useState([]);

return <div> eee

}


}


</div>



}


function App() {

const [test, setTodo] useState ("initial todo");

const [todolist, setList] = useState([{id: 1, text: "test 1"},{text: "go for a walk", done: true, id:2}]);

useEffect(()=>console.log("only once"), []);

return (

<div className="app">

<div><Dropdown /></div>

<div style={{display:

'none'}}><FileSystem /></ div>

<div style={{display: 'none'}}

className="header">

<div>


{test}

<button onClick={()=>setTodo("Hello todo"))>set todo</

button>

(todo=><TodoItem key=

(todolist.map

{todo.id} {...todo) md=

{(idArg)=>{

let listItem todolist.

find(((id))

=>id===idArg);

listItem.done =

!listItem.done

// setList(JSON.parse

(JSON.stringify (todolist)));

debugger;

setList([...todolist]);
}}/>)} </div>
<div>
</div>

</div>


<div className="footer">



Use the Shell to install new packages.


</div>

</div>

)

}

done, id }){



return <div>


function TodoItem({ text, md,

<button onClick={()=>md(id)}

>Mark done</button>

{'<'}{done? done:

not-done '}{'> '}


{text}</div>



}



export default App

