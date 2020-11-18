import React, { useState } from "react";
import axios from 'axios';
import Modal from 'react-modal';

function UpdateModal(props) {

    const [input, setInput] = useState(props.task)

    return (
        <Modal isOpen={props.modalIsOpen} onRequestClose={() => props.setModalIsOpen(false)}>
            <h2>Update Your Task</h2>
            <form>
                <input value={input} onChange={event => setInput(event.target.value)} />

                <button type="submit" onClick={() => {
                    axios.put(`http://localhost:1448/Todo/updateTodo?OldTask=${props.task}&updatedTask=${input}`)
                        .then(
                            res => console.log(res)
                        )
                        .catch(
                            err => console.log(err)
                        );
                    props.setModalIsOpen(false);
                }}>update</button>

                <button onClick={() => props.setModalIsOpen(false)}>cancel</button>
            </form>

        </Modal>
    )
}

export default UpdateModal;