
import './App.css';
import { useState,useEffect } from 'react';
import {AiOutlineDelete,AiOutlineCheck} from "react-icons/ai"
function App()
 {
  const [isCompleteScreen,SetisCompleteScreen]=useState(false)
  const[alltodos,setalltodos]=useState([])
  const[newTitle,setNewTitle]=useState("")
  const[newDiscription,setNewDiscription]=useState("")
  const[completedToDos,setCompletedToDos]=useState([])

const AddToDo=()=>{
let newTodoItem={
  title:newTitle,
  descrition:newDiscription
}
let UpdatedToDoArray=[...alltodos]
UpdatedToDoArray.push(newTodoItem)
setalltodos(UpdatedToDoArray)
localStorage.setItem ('todolist', JSON.stringify (UpdatedToDoArray));
setNewTitle("")
setNewDiscription("")
};

useEffect(()=>{
  let savedToDo= JSON.parse(localStorage.getItem('todolist'))
  let completed=JSON.parse(localStorage.getItem('completedlist'))
  if(savedToDo)
  {
    setalltodos(savedToDo)
  }
  if(completed)
  {
setCompletedToDos(completed)
  }

})

 const handledeletetodo=(index)=>{
let reducedTodo=[...alltodos]
reducedTodo.splice(index,1)
localStorage.setItem('todolist',JSON.stringify(reducedTodo))
setalltodos(reducedTodo)
 }

 const completedhandler=(index)=>
 {
let now=new Date();
let day=now.getDate();
let month=now.getMonth()+1; // month gives0-11 index so increasing by 1
let year=now.getFullYear();
let h=now.getHours();
let min=now.getMinutes();
let s=now.getSeconds();
let completedOn=h+":"+min+":"+s+"  "+year+"-"+month+"-"+day;
let filtereditem={...alltodos[index],completedOn:completedOn}
let updatedCompletedtodos=[...completedToDos]
updatedCompletedtodos.push(filtereditem)
handledeletetodo(index)
setCompletedToDos(updatedCompletedtodos)
localStorage.setItem ('completedlist', JSON.stringify (updatedCompletedtodos));
 // we can't send state need to send array after stringifying
 }

const handledeletecompletedtodo=(index)=>{
let newtodo = [...completedToDos]
newtodo.splice(index,1)
localStorage.setItem ('completedlist', JSON.stringify (newtodo))
setCompletedToDos(newtodo)
}



  return (
    <div className="App">
      <label htmlFor="todo-wrapper">
      <h1>My ToDos</h1>
      </label>
     
      <div className="todo-wrapper">
        <div className="todoInput">
          <div className='todo-input-item'>
            <label htmlFor="Input-title">Title:</label>
            <input type="text" placeholder="What's the task title?" id="Input-title" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
          </div>
          <div className='todo-input-item'>
            <label htmlFor="Input-description">Description:</label>
            <input type="text" placeholder="What's the task discription?" id="Input-description" value={newDiscription} onChange={(e)=>setNewDiscription(e.target.value)}/>
          </div>
          <div className='todo-input-item'>
           <button type='button' className='primaryBtn' onClick={AddToDo}>Add</button>
          </div>
        </div>


      <div className='BtnArea'>
        <button className={`secondaryBtn ${isCompleteScreen===false && "active"}`} onClick={()=>SetisCompleteScreen(false)}>Todo</button>
        <button className={`secondaryBtn ${isCompleteScreen===true && "active"}`} onClick={()=>SetisCompleteScreen(true)}>Complited</button>
      </div>
      <div className="todo-list">

      {isCompleteScreen === true
    ? completedToDos.map((item, index) => {
        return (
            <div className='todo-list-item' key={index}>
                <div>
                    <h3>{item.title}</h3>
                    <p>{item.descrition}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                    <AiOutlineDelete className="icon" onClick={() => handledeletecompletedtodo(index)} title='Delete?' />
                </div>
            </div>
        );
    })
    : alltodos.map((item, index) => {
        return (
            <div className='todo-list-item' key={index}>
                <div>
                    <h3>{item.title}</h3>
                    <p>{item.descrition}</p>
                </div>
                <div>
                    <AiOutlineDelete className="icon" onClick={() => handledeletetodo(index)} title='Delete?' />
                    <AiOutlineCheck className="check-icon" title='Done?' onClick={() => completedhandler(index)} />
                </div>
            </div>
        );
    })}

        

      

      </div>

    </div>
    </div>
  );
}

export default App;
