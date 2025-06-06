'use client'

import React, { useState } from 'react'
import { PlusIcon, Cross2Icon } from '@radix-ui/react-icons'

export default function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Sample To-Do List',
      author: 'YG',
      tasks: [
        { id: 1, text: 'Example task 1', done: false },
        { id: 2, text: 'Example task 2', done: true },
      ],
    },
  ])

  const addTodo = () => {
    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1
    setTodos([{ id: newId, title: '', author: 'Unknown', tasks: [] }, ...todos])
  }

  const removeTodo = (todoId) => {
    if (window.confirm('Are you sure you want to delete this To-Do list?')) {
      setTodos(todos.filter(t => t.id !== todoId))
    }
  }

  const updateTitle = (todoId, newTitle) => {
    setTodos(todos.map(t => (t.id === todoId ? { ...t, title: newTitle } : t)))
  }

  const addTask = (todoId) => {
    setTodos(
      todos.map(t => {
        if (t.id === todoId) {
          const newTaskId = t.tasks.length
            ? Math.max(...t.tasks.map(task => task.id)) + 1
            : 1
          return {
            ...t,
            tasks: [...t.tasks, { id: newTaskId, text: '', done: false }],
          }
        }
        return t
      })
    )
  }

  const removeTask = (todoId, taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(
        todos.map(t =>
          t.id === todoId
            ? { ...t, tasks: t.tasks.filter(task => task.id !== taskId) }
            : t
        )
      )
    }
  }

  const updateTaskText = (todoId, taskId, newText) => {
    setTodos(
      todos.map(t => {
        if (t.id === todoId) {
          const updatedTasks = t.tasks.map(task =>
            task.id === taskId ? { ...task, text: newText } : task
          )
          return { ...t, tasks: updatedTasks }
        }
        return t
      })
    )
  }

  const toggleTaskDone = (todoId, taskId) => {
    setTodos(
      todos.map(t => {
        if (t.id === todoId) {
          const updatedTasks = t.tasks.map(task =>
            task.id === taskId ? { ...task, done: !task.done } : task
          )
          return { ...t, tasks: updatedTasks }
        }
        return t
      })
    )
  }

  return (
    <div className="mx-auto p-6 hide-scrollbar overflow-auto  bg-blue-50 rounded-2xl overflow-x-auto shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={addTodo}
          aria-label="Add To-Do List"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-900 transition-colors duration-300 font-semibold"
        >
          <PlusIcon className="w-6 h-6" />
          Add List
        </button>
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-400 italic">No To-Do Lists found.</p>
      )}

      <div className="flex justify-start gap-1 ">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="bg-yellow-200 min-h-100 text-black min-w-70 w-1/4 rounded-2xl shadow-md p-5 flex flex-col border hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-2 gap-3">
              <input
                type="text"
                placeholder="List title"
                value={todo.title}
                onChange={e => updateTitle(todo.id, e.target.value)}
                className="flex-grow  border-b text-black font-semibold text-lg bg-transparent focus:outline-none"
              />
              <button
                onClick={() => removeTodo(todo.id)}
                aria-label="Delete To-Do List"
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              value={`Author: ${todo.author}`}
              readOnly
              aria-label="Author of this todo list"
              className="mb-4 px-3 py-1 bg-yellow-200 rounded-md border font-semibold cursor-not-allowed select-none"
            />

            {/* Tasks */}
            <div className="flex-grow bg-yellow-200 space-y-3">
              {todo.tasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 bg-yellow-200 text-black rounded-xl p-3 shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTaskDone(todo.id, task.id)}
                    className="cursor-pointer bg-yellow-200 w-5 h-5 mt-1"
                  />
                  <textarea
                    placeholder="Task description"
                    value={task.text}
                    onChange={e => {
                      if (!task.done) {
                        updateTaskText(todo.id, task.id, e.target.value);
                      }
                    }}
                    onInput={e => {
                      e.target.style.height = 'auto'; 
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    className={`flex-grow bg-transparent hide-scrollbar overflow-auto border-b focus:outline-none rounded-md px-1 py-1 resize-none ${task.done ? 'line-through' : ''}`}
                  />

                  <button
                    onClick={() => removeTask(todo.id, task.id)}
                    aria-label="Delete Task"
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <Cross2Icon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add task button */}
            <button
              onClick={() => addTask(todo.id)}
              className="mt-5 self-start flex items-center cursor-pointer gap-2 px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-300 font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <PlusIcon className="w-5 h-5" />
              Add Task
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}
