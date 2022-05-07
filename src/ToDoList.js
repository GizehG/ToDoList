import React from 'react'
import Task from './Task'

export default function ToDoList({tasksList, toggleTask }) {
  return (
    tasksList.map(task => {
        return <Task key={task.id} toggleTask={toggleTask} task = {task} />
    })
  )
}
