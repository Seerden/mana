import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/App.css';

import Header from './Header';
import Review from './Review';
import List from './List';
import User from '../components/User';
import Sets from '../components/Sets';
import ListsByUser from '../components/ListsByUser';
import NewList from '../components/NewList';

import Test from './Test';

import LoginProvider from '../context/LoginContext';
import { ListProvider } from '../context/ListContext';

const App = memo(() => {
    return (
        <>
            <LoginProvider>
                <Router>
                    <Header />
                    <div className="App__wrapper">
                        <div className="App">
                            <Routes>
                                {/* home route */}
                                <Route path="/" element={<div>Home</div>} />

                                {/* test routes */}
                                <Route path="/test/*" element={<Test />} />

                                {/* user routes */}
                                <Route path="/u/:username">
                                    <Route path="/" element={<User />} />
                                    <Route path="/sets" element={<Sets />} />
                                    <Route path="/lists">
                                        <Route path="/" element={<ListsByUser />} />
                                        <Route path="/new" element={<NewList />} />
                                    </Route>
                                </Route>

                                {/* list routes @todo: nest inside user routes */}
                                <ListProvider>
                                    <Route path="/list">
                                        <Route path="/:id*">
                                            <Route path="/review" element={<Review />} />
                                            <Route path="/" element={<List />} />
                                        </Route>
                                    </Route>
                                </ListProvider>

                                {/* catchall 404 route */}
                                <Route path="*" element={<div>404</div>} />
                            </Routes>
                        </div>
                    </div>

                </Router>
            </LoginProvider>

        </>
    )
})

export default App;