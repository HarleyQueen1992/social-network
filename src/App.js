import React from 'react';
import './App.css';
import HeaderContaioner from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { BrowserRouter, Route } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import UsersContainer from "./components/Users/UsersContainer";
import FriendsContainer from './components/Friends/FriendsContainer';
import Login from './components/Login/Login';

const App = (props) => {
        return ( <
            BrowserRouter >
            <
            div className = 'app-wrapper' >
            <
            HeaderContaioner / >
            <
            Navbar state = { props.store.getState().navbarPage }
            /> <
            div className = 'app-wrapper-content' >
            <
            Route path = '/dialogs'
            render = {
                () => < DialogsContainer / > }
            /> <
            Route path = '/profile/:userid?'
            render = {
                () => < ProfileContainer / > }
            /> <
            Route path = '/news'
            render = {
                () => < News / > }
            /> <
            Route path = '/music'
            render = {
                () => < Music / > }
            /> <
            Route path = '/settings'
            render = {
                () => < Settings / > }
            /> <
            Route path = '/friends'
            render = {
                () => < FriendsContainer / > }
            /> <
            Route path = '/users'
            render = {
                () => < UsersContainer / > }
            /> <
            Route path = '/login'
            render = {
                () => < Login / > }
            />                     <
            /div> <
            /div> <
            /BrowserRouter>);
        };

        export default App;