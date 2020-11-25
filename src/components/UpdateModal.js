import React, { useState } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import './UpdateModal.scss'

function UpdateModal(props) {

    const [input, setInput] = useState(props.task)

    return (
        <Modal isOpen={props.modalIsOpen} onRequestClose={() => props.setModalIsOpen(false)} className="Modal">
            <h2>Update Your Task</h2>
            <form>
                <div>
                    <input className="inputBox" value={input} onChange={event => setInput(event.target.value)} />
                </div>

                <button className="button" type="submit" onClick={() => {
                    axios.put(`http://localhost:1448/Todo/updateTodo?OldTask=${props.task}&updatedTask=${input}`)
                        .then(
                            res => console.log(res)
                        )
                        .catch(
                            err => console.log(err)
                        );
                    props.setModalIsOpen(false);
                }}>Update</button>

                <button className="button" onClick={() => props.setModalIsOpen(false)}>Cancel</button>
            </form>

        </Modal>
    )
}

export default UpdateModal;