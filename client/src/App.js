import React, { Component, Fragment } from 'react';
import './App.css'
import Nav from './Nav'
import Task from './Task'
import Worker from './Worker'
import iCrowdTask from './iCrowdTask/iCrowdTask'
import { BrowserRouter as Router, Route, HashRouter, Switch } from 'react-router-dom';





class App extends Component {



    render() {
        return (
            <div>
                <Router>

                    <Route path="/" component={Nav} />
                    <Route path="/task" component={Task} />
                    <Route path="/workers" component={Worker} />
                    <Route path='/iCrowdTask' component={iCrowdTask} />
                </Router>


            </div>

        )
    }
}

export default App