import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import MaterialTaskCard from './materialTaskCard';
import axios from 'axios';
import './DisplayTasks.scss'

function DisplayTasks(props) {

    const [todos, setTodos] = useState([]);
    //const status="Completed";
    console.log(props.requiredStatus);

    useEffect(async () => {
        let result = await axios({
            method: 'get',
            url: `http://localhost:1448/Todo/allTodoByStatus?requiredStatus=${(props.requiredStatus)}`
        }, [])

        let tasks = result.data.body;
        //console.log(tasks) ---its running infinitely
        const todoarray = tasks.map(task => task);

        setTodos(todoarray);
    })

    return (
        <div className="DisplayTasks">
            <ul>
                {todos.map(todo => (
                    //<li><TaskCard task={todo.task} status={todo.status} /></li>
                    <li><MaterialTaskCard todo={todo} task={todo.task} status={todo.status} progress={Math.floor(new Date()-new Date(todo.creationTime))} totalTime={todo.completionTime}/></li>
                    //<li><MaterialTaskCard todo={todo} task={todo.task} status={todo.status} progress={Math.floor(new Date()-new Date(todo.creationTime)/(60*60*1000))} totalTime={todo.completionTime}/></li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayTasks; 
