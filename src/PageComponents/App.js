import React, { useEffect, useState } from 'react';
import './App.scss';
import MaterialTaskCard from '../components/materialTaskCard';
import AddTaskForm from '../components/AddTaskForm';
import axios from 'axios';


function App() {

  const [todos, setTodos] = useState([]);

  useEffect(async () => {

    let result = await axios({
      method: 'get',
      url: `http://localhost:1448/Todo/allTodo`
    }, [])
    
    let tasks = result.data.body;
    //console.log(tasks) ---its running infinitely
    const todoarray = tasks.map(task => task);
    
    setTodos(todoarray);
  })

  // const addTodo = async (event) => {
  //   event.preventDefault();

  //   //console.log("result : " + result.data.body)


  //   // let taskAsArray=[tasks.map(task =>{
  //   //   task.task
  //   // })]
  //   //const todoarray=[]

  //   //setTodos([])

  //   // setTodos([tasks.map(task =>{
  //   //   console.log(task.task);
  //   //   todoarray.push(task.task)
  //   // })])


  //   //console.log("todos : " + todos)
  //   setTodos([...todos, input]);

  //   await axios({
  //     method: 'post',
  //     url: `http://localhost:1448/Todo/addTodo`,
  //     data: {
  //       task: input,
  //       CompletionTime: 12
  //     },
  //   })

  //   setInput('')
  // }

  //todos.map(todo => console.log(todo.completionTime-(timeNow-todo.creationTime)));
  return (
    <div className="App">
      <AddTaskForm/>
      <div className="DisplayTodos">
        <ul style={{ listStyleType: "none" }}>
          {todos.map(todo => (
            <li><MaterialTaskCard todo={todo} task={todo.task} status={todo.status} progress={Math.round(new Date()-Date.parse(todo.creationTime))} totalTime={todo.completionTime}/></li>
            // <li><TaskCard task={todo.task} status={todo.status} progress={Math.floor(new Date()-new Date(todo.creationTime)/(60*60*1000))} totalTime={todo.completionTime}/></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App; 
