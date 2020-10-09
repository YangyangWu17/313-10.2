import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './main.css'
import axios from 'axios';
import { storage } from './firebase'



function Header(props) {
    return <div className='header'>
        <label>
            {props.text}
        </label>

    </div>
}

function NavBar(props) {
    return <div className='header'>
        <ul>
            <Link className='linkDiv' to={props.route1}>{props.text1}</Link>
            |
            <Link className='linkDiv' to={props.route2}>{props.text2}</Link>
        </ul>
    </div>
}
function TaskSetting(props) {
    if (props.task === "") {
        return <div>
            <WaitTask value={props.value} />
        </div>
    }
    else if (props.task === "Choice Task") {
        return <div><ChoiceTask value={props.value} />
        </div>

    } else if (props.task === "Decision-Making Task") {
        return <div>
            <DecesionTask value={props.value} onChange={props.onChange} />
        </div>
    } else if (props.task === "Sentence-Level Task") {
        return <SentenceTask value={props.value} onChange={props.onChange} />

    }
    else if (props.task === "Image-Processing Task") {
        return <ImageTask value={props.value} onChange={props.onChange} />

    }
}
function WaitTask() {
    return <div className='task'>
        Waiting for choosing task
    </div>
}
function ChoiceTask(props) {
    return <div className='task'>
        <tr>
            <td>
                <Label
                    text="Choice task"
                />
            </td><td>
                <Radio
                    name='setting'
                    value="Option1"
                    onChange={props.onChange}
                />
            </td> <td>
                <Radio
                    name='setting'
                    value="Option2"
                    onChange={props.onChange}
                />
            </td>
        </tr>
    </div>
}
function DecesionTask(props) {
    return <div >

        <div className='radioDiv'>
            <tr>
                <td>
                    <Label
                        text="Decesion-making task"
                    />
                </td><td>
                    <Radio
                        name='setting'
                        value="Yes"
                        onChange={props.onChange}
                    />
                </td> <td>
                    <Radio
                        name='setting'
                        value="No"
                        onChange={props.onChange}
                    />
                </td>
            </tr>
        </div >
    </div>
}
function SentenceTask(props) {
    return <div >
        <Input
            name='setting'
            text='Sentence-Level Task'
            type="text"
            onChange={props.onChange}
        />
    </div>
}



function ImageTask(props) {
    var [file, setFile] = useState()
    var [url, setUrl] = useState()
    const [progress, setProgress] = useState(0)
    const fileSelectedHandler = e => {
        // setFile(e.target.files[0])

        if (e.target.files[0]) {
            const { image } = e.target.files[0]
            setFile(
                e.target.files[0]
            )
            // setFile(image)
        }
        console.log(file, "f")
    }
    const fileUploadHandler = e => {
        // const fd = new FormData();
        // fd.append('image', file, file.name);
        console.log(file)
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                //progess
                var UploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(UploadProgress)
            },
            (err) => {
                console.log(err);
            }, () => {
                //complete
                storage.ref('images').child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    setUrl(url)
                })
            });
    }
    return <div className='task' >
        <label>
            ImageProcessing Task
        </label>
        <br />
        <progress value={progress} max="100" />
        <br></br>
        <br />
        <input type='file'
            // style="display:none"
            text="Image"
            multiple="multiple"
            className='radioDiv'
            onChange={fileSelectedHandler}
        />
        <button
            name="setting"
            value={url}
            onClick={fileUploadHandler}>upload</button>
        <br />
        <img
            src={url || 'https://via.placeholder.com/200'}
            alt="Uploaded Image" height="200" width="200" />
        <br />
        <Radio
            name="setting"
            value={url}
            onChange={props.onChange} />
    </div>
}
const Input = (props) => {
    return <div className='inputDiv choice'>
        <label>{props.text} </label>
        <input
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value} />

    </div>
}
const Label = (props) => {
    return <div>
        <label>
            {props.text}
        </label>
    </div>
}
const Radio = (props) => {

    return <div className='task'>

        <input type="radio" name={props.name} value={props.value} className="radioDiv" onChange={props.onChange} />
        <label >{props.value}</label>
    </div>

}
function Button(props) {
    return <div className='button'>
        <button type={props.type} onClick={props.onClick}>
            {props.text} </button>
    </div>
}




// export default Task
export { Header, Input, Label, Radio, TaskSetting, Button, NavBar }