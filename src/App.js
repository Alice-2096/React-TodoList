import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList.js';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]); //initialize when page loads
  const todoNameRef = useRef();

  //pass in an empty array, will be called only once when page loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos)
      // setTodos((prevTodos) => [...prevTodos, ...storedTodos]);
      setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]); //triggered everytime todos changes

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name !== '') {
      console.log(name);
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
      });
      todoNameRef.current.value = null;
    }
  }

  function toggleTodo(id) {
    const newTodos = [...todos]; //create a copy of the todo list
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add to do</button>
      <button onClick={handleClearTodos}>clear completed todos</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
