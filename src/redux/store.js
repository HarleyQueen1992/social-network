import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {message:'Hi, my name is Artem', like: 50, dislike: 100},
                {message: 'Hi, my name is Artem', like: 52, dislike: 99},
                {message: 'Hi, my name is Artem', like: 51, dislike: 56},
                {message: 'Hi, my name is Artem', like: 9, dislike: 13},
                {message: 'Hi, my name is Artem', like: 51, dislike: 9},
            ],
            newPostText: 'mops.com'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'adasds'},
                {id: 4, message: 'Hi'},
                {id: 5, message: 'adasds'},
    
    
            ],
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Sveta'},
                {id: 3, name: 'Andrew'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Vicotr'},
                {id: 6, name: 'Artem'},
            ],
            newMessageText: 'mops.com'
        },
        navbarPage: {
            friends: [
                {name: 'Artem'},
                {name: 'Andrey'},
                {name: 'Evgenuy'}
            ],
        },
        friendsPage: {
            friends: [
                {name: 'Artem'},
                {name: 'Evgeney'}
            ]
        }
    },
    _callSubsciber() {
        console.log('HAHHAHA')
    },
    getState() {
        return  this._state;
    },
    subscribe(observer) {
        this._callSubsciber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubsciber(this._state);
    },
}
export default store;