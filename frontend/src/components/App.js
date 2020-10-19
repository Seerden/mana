import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/App.css';

import Header from './Header';
import Review from './review/Review';
import List from './list/List';
import User from './User';
import Sets from './sets/Sets';
import Lists from './lists/Lists';
import NewList from './newlist/NewList';
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
                            <ListProvider>
                                <Routes>
                                    <Route path="/test" element={<Test />} />
                                    {/* home route */}
                                    <Route path="/" element={<div>Home</div>} />
                                    <Route path="/test/:id" element={<Test />} />

                                    {/* user routes */}
                                    <Route path="/u/:username">
                                        <Route path="/" element={<User />} />
                                        <Route path="/sets" element={<Sets />} />
                                        <Route path="/lists">
                                            <Route path="/" element={<Lists />} />
                                            <Route path="/new" element={<NewList />} />
                                        </Route>

                                        <Route path="/list">

                                            <Route path="/:id">

                                                <Route path="/review" element={<Review />} />
                                                <Route path="/" element={<List />} />

                                            </Route>
                                        </Route>


                                    </Route>
                                    {/* catchall 404 route */}
                                    <Route path="*" element={<div>404</div>} />
                                </Routes>
                            </ListProvider>
                        </div>
                    </div>

                </Router>
            </LoginProvider>

        </>
    )
})

export default App;