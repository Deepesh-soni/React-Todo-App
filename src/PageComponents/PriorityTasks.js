import React, { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import MaterialTaskCard from '../components/materialTaskCard';
import axios from 'axios';
import DisplayTasks from '../components/DisplayTasks';

function PriorityTasks(props) {

    const [todos, setTodos] = useState([]);
    //const status="Completed";

    useEffect(async () => {
        let result = await axios({
            method: 'get',
            url: `http://localhost:1448/Todo/allTodo`
        }, [])

        let tasks = result.data.body;
        //console.log(tasks) ---its running infinitely
        const priorityTodoArray = tasks.filter(task => {
            let createdBefore = Math.floor((new Date() - new Date(task.creationTime)) / (60 * 60 * 1000));
            return task.completionTime <= (createdBefore * 2)
        });

        setTodos(priorityTodoArray);
    })

    return (
        <div className="PriorityTasks">
            <ul style={{ listStyleType: "none" }}>
                {todos.map(todo => (
                    // <li><TaskCard task={todo.task} status={todo.status} /></li>
                    <li><MaterialTaskCard todo={todo} task={todo.task} status={todo.status} progress={Math.floor(new Date()-new Date(todo.creationTime)/(60*60*1000))} totalTime={todo.completionTime}/></li>
                ))}
            </ul>
            {/* <DisplayTasks/> */}
        </div>
    );
}

export default PriorityTasks; 
