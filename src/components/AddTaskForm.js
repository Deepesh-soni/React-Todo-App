import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function AddTaskForm() {

    const [taskInput, setTaskInput] = useState('');
    const [timeInput, setTimeInput] = useState(0);

    const addTodo = async (event) => {
        event.preventDefault();

        await axios({
            method: 'post',
            url: `http://localhost:1448/Todo/addTodo`,
            data: {
                task: taskInput,
                completionTime: (timeInput>0)?timeInput:8
            },
        })

        setTaskInput('')
        setTimeInput(0)
    }

    const classes = useStyles();

    return (
        <div className="App">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Task" value={taskInput} onChange={(event)=>{setTaskInput(event.target.value)}}/>
                <TextField id="standard-basic" label="Estimated Time" value={timeInput} onChange={(event)=>{setTimeInput(event.target.value)}}/>
                <Button variant="outlined" disabled={!taskInput} color="primary" onClick={addTodo} >Add Task</Button>
            </form>
        </div>
    );
}







