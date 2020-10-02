import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/App.component.css';
import User from './User'

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' >Homepage (TODO: make component)</Route>
                    <Route path='/u/:username' component={User}>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;