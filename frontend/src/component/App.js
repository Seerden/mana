import React, { memo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/App.component.css';
import User from './User';
import ListsByUser from './ListsByUser';
import Header from './Header';
import NewList from './NewList';

const App = memo(() => {
    return (
        <Router>
            <Header />
            <div className="App">

                <Switch>
                    <Route exact path='/' >Homepage (TODO: make component)</Route>
                    <Route path="/u/:username/lists/" component={ListsByUser} />
                    <Route path="/u/:username" component={User} />
                    <Route path="/lists/new" component={NewList} />
                </Switch>
            </div>

        </Router>
    )
})

export default App;