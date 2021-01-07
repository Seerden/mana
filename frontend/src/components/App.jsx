import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style/App.scss';

import PrivateRoute from '../wrappers/PrivateRoute';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ReviewPage from 'components/review/ReviewPage';
import List from './list/List';
import User from './user/User';
import Lists from './lists/Lists';
import NewList from './newlist/NewList';
import Sets from './sets/Sets';
import NewSet from './sets/NewSet';
import Home from './Home';
import Register from './register/Register';
import Login from './login/Login';

import { LoginProvider } from '../context/LoginContext';

const App = () => {
    return (
        <>
            <RecoilRoot>
                <div className="App__wrapper">
                    <LoginProvider>
                        <Router>
                            <Header />
                            <div className="App">
                                <Routes>
                                    {/* home route */}
                                    <Route path="/" element={<Home />} />

                                    <Route path="/register" element={<Register />} />
                                    <Route path="/login" element={<Login />} />


                                    {/* user routes */}
                                    <Route path="/u/:username">
                                        <PrivateRoute path="/" component={User} />

                                        {/* Routes related to multiple lists */}
                                        <Route path="/lists">
                                            <PrivateRoute path="/" component={Lists} />
                                            <PrivateRoute path="/new" component={NewList} />
                                        </Route>

                                        {/* Routes related to individual list */}
                                        <Route path="/list">
                                            <Route path="/:id">
                                                <PrivateRoute path="/review" component={ReviewPage} />
                                                <PrivateRoute path="/" component={List} />
                                            </Route>
                                        </Route>

                                        {/* Routes related to sets */}
                                        <Route path="/sets">
                                            <PrivateRoute path="/" component={Sets} />
                                            <PrivateRoute path="/new" component={NewSet} />
                                        </Route>

                                    </Route>

                                    {/* catchall 404 route */}
                                    <Route path="*" element={<div>404</div>} />

                                </Routes>
                            </div>
                            <Footer />
                        </Router>
                    </LoginProvider>
                </div>
            </RecoilRoot>
        </>
    )
}

export default App;