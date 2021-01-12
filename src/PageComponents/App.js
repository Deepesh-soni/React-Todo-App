import React, { useEffect, useState } from 'react';
import './App.scss';
import MaterialTaskCard from '../components/materialTaskCard';
import axios from 'axios';
import FormikAddTaskForm from '../components/FormikAddTaskForm';


function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {

    axios({
      method: 'get',
      url: `http://localhost:1448/Todo/allTodo`
    })
      .then(result => {
        const tasks = result.data.body;
        const todoarray = tasks.map(task => task);

        setTodos(todoarray);

        localStorage.setItem("Todos", JSON.stringify(todoarray));
      })
      .catch(err => {
        console.log("error says you are offline" + err);
        const tasks = JSON.parse(localStorage.getItem("Todos"));
        const todoarray = tasks.map(task => task);
        setTodos(todoarray);
      })

    // if(!navigator.onLine){
    //   console.log("navigator says you are offline");
    //   const tasks=JSON.parse(localStorage.getItem("Todos"));
    //   const todoarray = tasks.map(task => task);
    //   setTodos(todoarray);
    // }

    // let tasks = result.data.body;
    //console.log(tasks) ---its running infinitely

    // const todoarray = tasks.map(task => task);

    // setTodos(todoarray);

    // localStorage.setItem("Todos", JSON.stringify(todoarray));
  },[])

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
      {/* <AddTaskForm /> */}
      <FormikAddTaskForm />
      <div className="DisplayTodos">
        <ul style={{ listStyleType: "none" }}>
          {todos.map(todo => (
            <li key={todo._id}><MaterialTaskCard todo={todo} task={todo.task} status={todo.status} progress={Math.round(new Date() - Date.parse(todo.creationTime))} totalTime={todo.completionTime} /></li>
            // <li><TaskCard task={todo.task} status={todo.status} progress={Math.floor(new Date()-new Date(todo.creationTime)/(60*60*1000))} totalTime={todo.completionTime}/></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App; 
