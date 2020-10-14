import React, { memo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/App.css';

import User from './User';
import ListsByUser from './ListsByUser';
import Sets from './Sets';
import Header from './Header';
import NewList from './NewList';
import Review from './Review';
import List from './List';

import Test from './Test';

import LoginProvider from '../context/LoginContext';

const App = memo(() => {
    return (
        <>
            <LoginProvider>
                <Router>
                    <Header />
                    <div className="App">
                        <Switch>
                            <Route exact path='/' >Homepage (TODO: make component)</Route>
                            <Route exact path="/u/:username/sets/" component={Sets} />
                            <Route exact path="/u/:username/lists/" component={ListsByUser} />
                            <Route exact path="/u/:username/lists/new/" component={NewList} />
                            <Route exact path="/u/:username/" component={User} />
                            <Route exact path="/list/:id/" component={List} />
                            <Route exact path="/list/:id/review" component={Review} />
                            <Route exact path="/r/" component={Review} />
                            <Route exact path='/test' component={Test} />
                            <Route path='*'>404</Route>
                        </Switch>
                    </div>
                </Router>
            </LoginProvider>

        </>
    )
})

export default App;

/*
@TODO: combine all /u/:username/* routes into one nested router structure
*/