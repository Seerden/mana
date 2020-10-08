import React, { memo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/App.css';

import User from './User';
import ListsByUser from './ListsByUser';
import Header from './Header';
import NewList from './NewList';
import Review from './Review';
import List from './List';

import LoginProvider from '../context/LoginContext';

const App = memo(() => {
    return (
        <>
            <Router>
                <LoginProvider>
                    <Header />
                </LoginProvider>

                    <div className="App">
                        <Switch>
                            <Route exact path='/' >Homepage (TODO: make component)</Route>
                            <Route exact path="/u/:username/lists/" component={ListsByUser} />
                            <Route exact path="/u/:username/lists/new/" component={NewList} />
                            <Route exact path="/u/:username/" component={User} />
                            <Route exact path="/list/:id/" component={List} />
                            <Route exact path="/list/:id/review" component={Review} />                            
                            <Route exact path="/r/" component={Review} />
                            <Route path='*'>404</Route>
                        </Switch>
                    </div>
            </Router>

        </>
    )
})

export default App;

/*
@TODO: combine all /u/:username/* routes into one nested router structure
*/