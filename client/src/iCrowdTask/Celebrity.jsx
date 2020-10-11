import React, { Component } from 'react';
import './CrowdTask.css'
import Clarifai from 'clarifai';
import 'semantic-ui-css/semantic.min.css'


const app = new Clarifai.App({
    apiKey: 'ae2f60b0cbf54989825943cd4c5e0c8e'
});

const SearchBar = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="ui icon input">
                <input
                    className='search'
                    onChange={props.handleChange}
                    type="text"
                    placeholder="Put your  imageUrl here..."
                />
                <i className="search icon" />
            </div>
        </form>
    );
};

const ImageDisplay = (props) => {
    return (
        <div >
            <img src={props.imageUrl} alt="" width='600px' height='450px' />
            {props.showCelebName ? <p> Clarifai guesses it would be: {props.celebName.name}-{Math.round(props.celebName.value * 100)}%</p> : <p>Waiting for image</p>}
        </div>
    );
};

class CV extends Component {



    handleImage = (e) => {
        fetch('http://localhost:5000/image', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                imageURL: this.state.imageUrl,
                description: this.state.celebName.name
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log("Error:" + err)
            })
    }
    state = {
        input: "",
        imageUrl: "",
        celebName: {},
        showCelebName: false,
    };

    //display celeb data
    setCelebName = celebName => {
        console.log(celebName)
        this.setState({ celebName });
    };

    handleChange = e => {
        this.setState({
            input: e.target.value
        });
        console.log(this.state.input);
    };

    onHide = () => {
        let doesShow = this.state.showCeleName;
        this.setState({
            showCelebName: !doesShow
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let doesShow = this.state.showCeleName;

        this.setState({
            imageUrl: this.state.input,
            showCelebName: true
        });

        app.models
            .predict("e466caa0619f444ab97497640cefc4dc", this.state.input)
            // .predict("bd367be194cf45149e75f01d59f77ba7", this.state.input)
            .then(response => {
                this.setCelebName(response.outputs[0].data.regions[0].data.concepts[0])

            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <div>
                    <SearchBar
                        className="searchBar"
                        onFormSubmit={this.onFormSubmit}
                        onInputChange={this.onInputChange}
                    />
                    <div className="container">
                        <ImageDisplay
                            box={this.state.box}
                            celebName={this.state.celebName}
                            imageUrl={this.state.imageUrl}
                            showCelebName={this.state.showCelebName}
                        />
                    </div>
                    {/* <Radio
                        name="description"
                        value={this.state.celebName}
                        onChange={this.handleChange} /> */}
                    <button type='button' onClick={this.handleImage}>Save</button>
                </div>
            </div>
        );
    }
}
export default CV;
