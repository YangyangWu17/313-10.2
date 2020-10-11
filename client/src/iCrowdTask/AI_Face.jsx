import React, { useState } from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import './CrowdTask.css'



const Label = (props) => {
    return <div className="choice">
        <label>
            {props.text}
        </label>
    </div>
}
const Radio = (props) => {

    return <div className="choice" >

        <input type="radio" name={props.name} value={props.value} onChange={props.onChange} />
        <label className={props.className} >{props.value}</label>
    </div>

}
function Choice(props) {

    return <div >
        <form>
            <div >
                <Label
                    text="Choose hair color:"
                />
                <Radio
                    name='description'
                    value="black"
                    onChange={props.onChange}
                />
                <Radio
                    name='description'
                    value="gray"
                    onChange={props.onChange}
                /></div>
        </form>

    </div>
}

const Face = () => {


    const [imageInfo, setImageInfo] = useState({
        imageURL: '',
        description: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setImageInfo((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
        console.log(imageInfo)
    }

    const handleImage = (e) => {
        fetch('http://localhost:5000/image', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                imageURL: imageInfo.imageURL,
                description: imageInfo.description
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log("Error:" + err)
            })
    }
    const [image, setImage] = useState('');
    var [active, setActive] = useState('')
    var handleChoice = (e) => {
        const a = e.target.value
        console.log(a)
        if (a === 'black') {
            setActive("&hair_color=black");
        } else if (a === 'gray') {
            setActive("&hair_color=gray");
        }
        console.log(active)
    }
    const handleClick = () => {
        axios
            .get(
                "https://api.generated.photos/api/v1/faces?api_key=VaAbuIxhxxU6Ia_H77v49A&order_by=random&gender=female" + active,
                {
                    headers: {
                        Authorization: `API-Key VaAbuIxhxxU6Ia_H77v49A`,
                    },
                }
            )
            .then((res) => {
                const url = res.data.faces[0].urls[4][512]
                console.log(url);
                setImage(url);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div>
            <div>
                <Choice onChange={handleChoice, handleChange} value={active} />
            </div>
            <img src={image} className='image' />
            <div>
                <button type='button' onClick={handleClick}>New face</button>
                <br />
                <Radio
                    name="imageURL"
                    value={image}
                    className='url'
                    onChange={handleChange} />
                <br />
                <button type='button' onClick={handleImage}>Save</button>

            </div>

        </div >
    );
};

export default Face