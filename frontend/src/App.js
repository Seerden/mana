import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.component.css';
import CSV from './component/csv'

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' >Homepage (TODO: make component)</Route>
                    <Route path='/u/:username'>User page (TODO: make component)</Route>
                    <Route path='/csv'><CSV /></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;