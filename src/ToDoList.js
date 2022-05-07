import React from 'react'
import Task from './Task'
import './Styles.css';

export default function ToDoList({tasksList, toggleTask }) {
  return (
    tasksList.map(task => {
        return <Task key={task.id} toggleTask={toggleTask} task = {task} />
    })
  )
}
