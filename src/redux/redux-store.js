import { useReducer } from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";
import userReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    navbarPage: navbarReducer,
    usersPage: userReducer,
    auth: authReducer
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store

export default store;