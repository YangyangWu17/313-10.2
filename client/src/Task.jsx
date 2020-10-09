import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import { Header, Radio, Label, Input, TaskSetting, Button } from './TaskCompnents'
const Task = (props) => {
    const [taskInfo, setTaskInfo] = useState({
        type: '',
        title: '',
        description: '',
        expiryDate: '',
        setting: '',
        master: '',
        reward: '',
        number: '',
        image: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(e.target)
        setTaskInfo((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
        console.log(taskInfo)
    }

    const handleTask = (e) => {
        fetch('http://localhost:5000/task', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            // headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify({
                type: taskInfo.type,
                title: taskInfo.title,
                description: taskInfo.description,
                expiryDate: taskInfo.expiryDate,
                setting: taskInfo.setting,
                master: taskInfo.master,
                reward: taskInfo.reward,
                number: taskInfo.number,
                image: taskInfo.image
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log("Error:" + err)
            })
    }



    return <div>
        <div className='radioDiv'>
            <tr>
                <td>
                    <Label
                        text="Select Task Type"
                    />
                </td><td>
                    <Radio
                        name='type'
                        value="Choice Task"
                        onChange={handleChange}
                    />
                </td><td>
                    <Radio
                        name='type'
                        value="Decision-Making Task"
                        onChange={handleChange}
                    />
                </td><td>
                    <Radio
                        name='type'
                        value="Sentence-Level Task"
                        onChange={handleChange}
                    />
                </td><td>
                    <Radio
                        name='type'
                        value="Image-Processing Task"
                        onChange={handleChange}
                    />
                </td>
            </tr>
        </div>
        <Header text="Describe your task to users" />
        <Input
            name='title'
            text='Title'
            type="text"
            placeholder="Enter task title"
            onChange={handleChange}
            value={taskInfo.title} />
        <Input
            name='description'
            text='Desciption'
            type="text"
            placeholder="Enter task description"
            onChange={handleChange}
            value={taskInfo.description} />
        <Input
            name='expiryDate'
            text='Expiry Date'
            type="text"
            placeholder="Month-Year"
            onChange={handleChange}
            value={taskInfo.expiryDate} />
        <Header text="Setting up your task" />
        <TaskSetting
            task={taskInfo.type}
            onChange={handleChange}
            value={taskInfo.setting}
        />
        <Header text="WorkerRequirement" />
        <div className='radioDiv'>
            <tr>
                <td>
                    <Label
                        text="Require Master Worker"
                    />
                </td><td>
                    <Radio
                        name='master'
                        value="Yes"
                        onChange={handleChange}
                    />
                </td> <td>
                    <Radio
                        name='master'
                        value="No"
                        onChange={handleChange}
                    />
                </td>
            </tr>
        </div >
        <Input
            name='reward'
            text='Reward per response'
            type="text"
            onChange={handleChange}
            value={taskInfo.reward} />
        <Input
            name='number'
            text='Number of workers'
            type="text"
            onChange={handleChange}
            value={taskInfo.number} />
        <Button
            type='submit'
            text='Save'
            onClick={handleTask}
        />
    </div >
}
export default Task