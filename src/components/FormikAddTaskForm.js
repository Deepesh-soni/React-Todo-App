import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './FormikAddTaskForm.scss';


const addTodo = async ({ Task, Time }) => {

    await axios({
        method: 'post',
        url: `http://localhost:1448/Todo/addTodo`,
        data: {
            task: Task,
            completionTime: (Time > 0) ? Time : 8
        },
    })
}

function AddTask({ values, handleChange, touched, errors, isSubmitting }) {
    return (
        <div className="FormikAddTaskForm">
            <Form>
                <div className="fields">
                    <div>
                        <div>
                            <label>Task</label>
                        </div>
                        {touched.Task && errors.Task && <p>{errors.Task}</p>}
                        <Field className="inputField" type="string" name="Task" placeholder="Enter Task here" />
                    </div>
                    <div>
                        <div>
                            <label>Estimated Time</label>
                        </div>
                        <Field className="inputField" type="number" name="Time" />
                    </div>
                    <button className="button" disabled={isSubmitting}>Add</button>
                </div>
            </Form>
        </div>
    );
}

const FormikAddTaskForm = withFormik({
    mapPropsToValues() {
        return {
            Task: '',
            Time: 0,
        }
    },
    validationSchema: yup.object().shape({

        Task: yup.string().min(3, "a task should have minimum of 4 chars"),
        // Task: yup.string().min(3,"a task should have minimum of 4 chars").required("this is a required fiels/write your message here"),
    }),
    handleSubmit(values, { resetForm, setSubmitting }) {
        console.log(values)
        addTodo(values)
        resetForm()
        setSubmitting(false)
    }
})(AddTask)

export default FormikAddTaskForm;





