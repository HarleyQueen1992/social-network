import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import StoreContext from './StoreContext'
import { Provider } from 'react-redux';


// let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App state={store.getState()} store={store}/>
            </Provider>
        </React.StrictMode>, document.getElementById('root')
    );
// }

// rerenderEntireTree(store.getState());

// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// });


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// export { dialogs, messages };
