import { useState } from "react"

const json = {
  "id": 1,
  "name": "root",
  "contents": [
    {
      "id": 2,
      "name": "file1.txt"
    },
    {
      "id": 3,
      "name": "dir1",
      "contents": [
        {
          "id": 4,
          "name": "file2.txt"
        },
        {
          "id": 5,
          "name": "dir2",
          "contents": [
            {
              "id": 6,
              "name": "file3.txt"
            }
          ]
        }
      ]
    },
    {
      "id": 7,
      "name": "file4.txt"
    }
  ]
}

export default function FileSystem(){
  return (<div>
    {json.contents.map(file=><File {...file} />)}
    </div>
  )
}

const nameMap = {};
const delMap = {};
const contentsMap = {};
function File({name, contents: contentsProp, id, setHide: setHideProp}){
  const [del, setDel]=useState(delMap[id]);
  const [hide, setHide] = useState(false);
  const [nameArg, setName] = useState(nameMap[id] || name);
  const [contents, setContents] = useState(contentsMap[id]|| contentsProp || []);
  if(del) return <></>;
  return <div style={{marginLeft: '20px'}}>
    {nameArg}
    <button onClick={()=>{ 
      const newName = window.prompt("Enter new name", nameArg);
      nameMap[id] = newName;
      setName(newName);
  }}>Rename</button>
  <button onClick={()=>{
    if(!window.confirm("sure to delete ?")) return;
    delMap[id]=true;
    setDel(true);
  }}>Delete</button>
   <button onClick={()=>{
    const name = window.prompt("new name : ");
    const list = [...contents, {name, id: Date.now()}];
    contentsMap[id]=list;
    setContents(list);
  }}>Add</button>
    {contents.length && <>
    <br/>
    <button onClick={()=>setHide(!hide)}>Toggle</button>
    {
    !hide && contents.map(file=><File {...file} setHide={setHide}/>)
    }
    </>}
  </div>
                       }
