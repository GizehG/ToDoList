import React, {useState, useRef, useEffect} from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';
import './Styles.css'

const LOCAL_STORAGE_KEY = 'ToDoListApp.tasks'

function App() {
  const [tasks, setTasks] = useState([]);
  const taskName = useRef();

  useEffect(() => {
     const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
     if (storedTasks) setTasks(storedTasks)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks)) 
  }, [tasks])

  function toggleTask(id){
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.done = !task.done
    setTasks(newTasks)
  }

  function addTask(e){
    const name = taskName.current.value
    if (name === '') return
    setTasks(prevTasks =>{
      return [...prevTasks, {id: uuidv4(), name:name, done:false}]
    })
    taskName.current.value = null
  }

  function clearTasks(){
    const newTasks = tasks.filter(task => !task.done)
    setTasks(newTasks)
  }

  return (
    <>
      <div className="Title"> My To Do List </div>
      <input ref = {taskName} type="text" className="Input"/>
      <br></br>
      <div className="Container">
        <button onClick={addTask} className="Button">Add task</button>
        <button onClick={clearTasks} className="Button">Clear list</button>
      </div>
      
      <div className="Label" >{tasks.filter(task => !task.done).length} tasks left</div>
      <ToDoList tasksList = {tasks}  toggleTask = {toggleTask}/> 
    </>
  )
   
}

export default App;
