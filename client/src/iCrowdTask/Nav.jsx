import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './CrowdTask.css'

function NavBar(props) {
    return <div >
        <h1>ICrowdTasks</h1>
        <ul className='header'>
            <Link className='linkDiv' to={props.route1}>{props.text1}</Link>
            |
            <Link className='linkDiv' to={props.route2}>{props.text2}</Link>
            |
            <Link className='linkDiv' to={props.route3}>{props.text3}</Link>

        </ul>
    </div>
}
const Nav = (props) => {
    return <div className='header-div'>
        <NavBar
            text1="Get AI Generated Face"
            text2="Celebrity Indetification"
            text3="Voice Recogniton"
            text4="Chatroom with Goolge Account"
            route1='/AIFACE'
            route2='/Celebrity'
            route3='/Voice'
            route4='/Chat'
        />
    </div>
}

export default Nav