import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style/App.scss';

import PrivateRoute from '../wrappers/PrivateRoute';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Review from './review/Review';
import List from './list/List';
import User from './User';
import Lists from './lists/Lists';
import NewList from './newlist/NewList';
import Test from './Test';
import Home from './Home';
import Register from './register/Register';
import Login from './login/Login';

import LoginProvider from '../context/LoginContext';
import { ListProvider } from '../context/ListContext';
import { ReviewProvider } from '../context/ReviewContext';

const App = memo(() => {
    return (
        <>
            <div className="App__wrapper">
                <LoginProvider>
                    <Router>
                        <Header />
                        <div className="App">
                            <ListProvider>
                                <Routes>
                                    {/* test route */}
                                    <Route path="/test" element={<Test />} />

                                    {/* home route */}
                                    <Route path="/" element={<Home />} />

                                    <Route path="/register" element={<Register />} />
                                    <Route path="/login" element={<Login />} />


                                    {/* user routes */}
                                    <Route path="/u/:username">
                                        <PrivateRoute path="/" component={User}/>
                                        <Route path="/lists">
                                            <PrivateRoute path="/" component={Lists} />
                                            <PrivateRoute path="/new" component={NewList} />
                                        </Route>

                                        <Route path="/list">

                                            <Route path="/:id">

                                                <Route path="/review" element={
                                                    <ReviewProvider>
                                                        <Review />
                                                    </ReviewProvider>
                                                }
                                                />
                                                <Route path="/" element={<List />} />

                                            </Route>
                                        </Route>


                                    </Route>
                                    {/* catchall 404 route */}
                                    <Route path="*" element={<div>404</div>} />
                                </Routes>
                            </ListProvider>
                        </div>
                        <Footer />
                    </Router>
                </LoginProvider>
            </div>

        </>
    )
})

export default App;