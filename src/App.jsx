import { useState, useEffect } from "react"
import AddTaskForm from "./components/AddTaskForm"
import SearchTaskForm from "./components/SearchTaskForm"
import TodoInfo from "./components/TodoInfo"
import TodoList from "./components/TodoList"

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const deleteAllTasks = () => {
    const isConfirmed = confirm('Are you sure?')
    if (isConfirmed) {
      console.log('Удаляем все задачи')
      setTasks([])
    }
  }
  const deleteTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }
  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(tasks.map((task) => {
      if(task.id === taskId) {
        return {...task, isDone}
      }
        return task
    }))
    console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`)
  }
  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }
      console.log('Задача добавлена')

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
    }
  }
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = clearSearchQuery.length > 0 ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
  : null
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm 
        addTask = {addTask}
        newTaskTitle = {newTaskTitle}
        setNewTaskTitle = {setNewTaskTitle}
      />
      <SearchTaskForm
        searchQuery= {searchQuery}
        setSearchQuery = {setSearchQuery}      
        
      />
      <TodoInfo
        total = {tasks.length}
        done = {tasks.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick = {deleteAllTasks}
      />
      <TodoList
        tasks = {tasks}
        filteredTasks = {filteredTasks}
        onDeleteTaskButtonClick = {deleteTask}
        onTaskCompleteChange = {toggleTaskComplete}
      />
    </div>
  )
}

export default App
