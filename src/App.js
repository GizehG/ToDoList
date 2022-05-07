import React, {useState, useRef, useEffect} from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

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
      <ToDoList tasksList = {tasks}  toggleTask = {toggleTask}/> 
      <input ref = {taskName} type="text" />
      <button onClick={addTask}>Add task</button>
      <button onClick={clearTasks}>Clear list</button>
      <div>{tasks.filter(task => !task.done).length} tasks left</div>
    </>
  )
   
}

export default App;
