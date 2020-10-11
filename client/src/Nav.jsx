import React, { useState } from 'react'
import { NavBar } from './TaskCompnents'
import './main.css'

const Nav = (props) => {
    return <div className='header-div'>
        <NavBar
            text1="New Requester Task"
            text2="Worker Task"
            text3="iCrowdTask"
            route1='/task'
            route2='/workers'
            route3='/iCrowdTask'
        />
    </div>
}

export default Nav