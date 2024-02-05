import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/Todoform'
import TodoItem from './components/Todoitem'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) =>{
    setTodos( (prev)=>[{id:Date.now(), ...todo}, ...prev])
  }
  const updateTodo = (id,todo) => {
    setTodos( (prev)=> prev.map((prevTodo)=>( prevTodo.id=== id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length >0 ) {
      setTodos(todos)
    }
  }, [])
  
  useEffect(()=>{
    localStorage.setItem( "todos", JSON.stringify(todos))
  }, [todos])

  return (

    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className=' p-8 min-h-screen bg-[#ffba00]'>
    
                <div className=" py-3 bg-white rounded-lg px-4 max-w-2xl mx-auto bg-transparent shadow-2xl ">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2 text-red-500">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map( (todo, index)=> (
                          <div key={todo.id}
                            className='w-full'
                          >
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>        
  )
}

export default App
