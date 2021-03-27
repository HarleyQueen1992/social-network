import { useReducer } from "react";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import dialogsReducer from "./DialogsReducer/dialogs-reducer";
import friendsReducer from "./FriendsReducer/friends-reducer";
import navbarReducer from "./NavbarReducer/navbar-reducer";
import profileReducer from "./ProfileReducer/profile-reducer";
import userReducer from "./UsersReducer/user-reducer";
import authReducer from "./AuthReducer/auth-reducer";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./AppReducer/app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    navbarPage: navbarReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store

export default store;