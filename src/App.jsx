import { useState, useEffect } from "react"
import { Todoprovider } from "./contexts"
import TodoForm from "./components/TodoForm"
import TodoItem from './components/TodoItem'

function App() {
const[todos, setTodos] = useState([])

const addTodo = (todo) => {
  setTodos ((prev) => [{id: Date.now(), ...todo }, ...prev])
}

const updateTodo = (id, todo) => {
  setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
}


const deleteTodo =(id) => {
setTodos((prev) => prev.filter((todo) => (todo.id !== id )))
}

const toggleComplete = (id) => {
  setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed } : prevTodo)))
}

// The first useEffect ensures that any saved todos are loaded when the app starts.
// The second useEffect ensures that any changes to the todos state are saved to localStorage, 
// keeping the data persistent across page reloads.


useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))

  if(todos && todos.length>0){
    setTodos(todos)
  }
},[])

useEffect (() =>{
  localStorage.setItem("todos", JSON.stringify(todos))
},[todos])

// Difficulties using only one useEffect:
// Initialization Timing:
// The initial setting of todos from localStorage happens only once, 
// but saving todos to localStorage should happen every time todos changes.
//  Combining them can cause confusion about the timing and order of operations.

  return (
    <Todoprovider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key ={todo.id}
                            className = 'w-full'>
                              <TodoItem todo={todo} />
                              </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
   
  )
}

export default App
