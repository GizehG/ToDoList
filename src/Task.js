import React from 'react'

export default function Task({ task, toggleTask }) {
    function handleTaskClick(){
        toggleTask(task.id)
    }
  return (
    <div>
        <input className="Checkbox" type="checkbox" checked={task.done} onChange={handleTaskClick} />
        {task.name}
    </div>
  )
}
