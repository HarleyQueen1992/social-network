import React from 'react'
import { Redirect } from 'react-router-dom';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Messages from "./Messages/Messages";


const Dialogs = (props) => {


    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogsItem id={d.id} name={d.name}/>);
    let messageElements = props.dialogsPage.messages.map(m => <Messages messag={m.message}/>);

    let newMessageElement = React.createRef();

    let sendMessages = () => {
        props.sendMessages();

    }
    let submitMessage = () => {
        let text = newMessageElement.current.value;
        props.submitMessage(text);
    }
    // if (props.isAuth === false) {
    //     return <Redirect to={'/login'} />
    // }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}

            </div>
            <div className={s.messageBlock}>
                <div className={s.messages}>
                    {messageElements}
                </div>
                <div className={s.bottom}>
                    <textarea value={props.dialogsPage.newMessageText} 
                              ref={ newMessageElement } 
                              className={s.text} 
                              onChange={ submitMessage }/>
                    
                    <button onClick={sendMessages} className={s.but}>Submit</button>
                </div>
            </div>
            <div className={s.other}>
                content
            </div>
        </div>
    )
}

export default Dialogs
