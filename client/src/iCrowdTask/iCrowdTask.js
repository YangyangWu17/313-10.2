import React from 'react';
import Nav from './Nav'
import AI_Face from './AI_Face'
import Celebrity from './Celebrity'
import Voice from './Voice'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';




function App() {
  return (
    <div className="App">

      <Router>
        <Route path="/" component={Nav} />
        <Route path="/AIFACE" component={AI_Face} />
        <Route path="/Celebrity" component={Celebrity} />
        <Route path='/Voice' component={Voice} />
      </Router>

    </div>
  );
}

export default App;
