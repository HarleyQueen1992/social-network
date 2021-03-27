import React from 'react'
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Messages from "./Messages/Messages";
import AddMessageFromRedux from './AddMessage/AddMessageFromRedux';

const Dialogs = (props) => {


    let dialogsElements = props.dialogsPage.friendsInDialogs.map(d => <DialogsItem photos={d.photos} id={d.id} name={d.name}/>);
    let messageElements = props.dialogsPage.messages.map(m => <Messages messag={m.message}/>);


    let sendMessage = (values) => {
        props.sendMessageActionCreator(values.newMessageBody);

    }
    return (
        <div className={s.dialogs}>
   
            <div className={s.dialogsItem}>
                <div className={s.friends} >
                    {dialogsElements}
                </div>  
            </div>
            <div className={s.messageBlock}>
                <div className={s.messages}>
                    {messageElements}
                </div>
                <AddMessageFromRedux onSubmit={sendMessage} />
            </div>
            <div className={s.other}>
                content
            </div>
        </div>
    )
}

export default Dialogs

