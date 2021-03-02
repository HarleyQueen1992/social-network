const SEND_MESSAGE = 'SEND-MESSAGE';
// const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'adasds' },
        { id: 4, message: 'Hi' },
        { id: 5, message: 'adasds' },


    ],
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Sveta' },
        { id: 3, name: 'Andrew' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Vicotr' },
        { id: 6, name: 'Artem' },
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.newMessageText }]

            }

            // case UPDATE_NEW_MESSAGE_TEXT: {
            //     return {
            //         ...state,
            //         newMessageText: action.newText
            //     }         
            // }
        default:
            return state;
    }
}

export const sendMessageActionCreator = (newMessageText) => {
        return {
            type: SEND_MESSAGE,
            newMessageText
        }
    }
    // export const updateNewMessageTextActionCreator = (body) => {
    //     return {
    //         type: UPDATE_NEW_MESSAGE_TEXT,
    //         newText: body
    //     }
    // }

export default dialogsReducer;