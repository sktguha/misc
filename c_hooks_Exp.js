import React, {useReducer} from 'react';

export function App(props) {
  const [state, dispatch] = useReducer((state,act)=>[...state, act], ['init']);
  return (
    <div className='App'>
    {state}<br/>
      <button onClick={()=>dispatch(Math.random())}>add state</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// Log to console
console.log('Hello console')
