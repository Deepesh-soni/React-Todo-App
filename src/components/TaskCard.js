import React, { useState } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateModal from './UpdateModal'
import EditIcon from '@material-ui/icons/Edit';
import LinearProgress from "@material-ui/core/LinearProgress";

Modal.setAppElement('#root')

function TaskCard(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [input, setInput] = useState(props.task)
    const [selectedOption, setSelect] = useState(props.status);
    //console.log(todo.completionTime-(timeNow-todo.creationTime));

    return (
        <div style={{ background: "grey", padding: 8, margin: 8, width: 450 }}>
            <div>
                {props.task}
            </div>
            <DeleteIcon onClick={() => {
                axios.delete(`http://localhost:1448/Todo/removeTodo?task=${props.task}`)
                    .then(
                        res => console.log(res)
                    )
                    .catch(
                        err => console.log(err)
                    )
            }}>delete</DeleteIcon>
            <EditIcon onClick={() => setModalIsOpen(true)} />


            <select value={selectedOption} onChange={(event) => {
                setSelect(event.target.value)
                // console.log(props.status)
                // console.log("event.target.value 1 : "+event.target.value)
                // setSelect(event.target.value)
                // console.log("event.target.value 2 : "+event.target.value)
                // console.log("option: "+selectedOption)
                // console.log("option: "+selectedOption)
                axios.put(`http://localhost:1448/Todo/updateStatusOfTodo?task=${props.task}&updatedStatus=${event.target.value}`)
                    .then(
                        res => console.log(res)
                    )
                    .catch(
                        err => console.log(err)
                    )
            }}>
                <option value="Under Progress">Under Progress</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
            </select>
            <UpdateModal task={props.task} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            <LinearProgress variant="determinate" value={(props.progress/props.totalTime)*100} />
            
        </div>
    )
}
// const deleteTodo = async (task) => {
//     await axios({
//         method: 'delete',
//         url: `http://localhost:1448/Todo/removeTodo?task=${(task)}`
//     })
// }
// const deleteTodo = async


export default TaskCard;

