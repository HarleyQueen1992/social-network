import React from 'react'
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Messages from "./Messages/Messages";
import AddMessageFromRedux from './AddMessage/AddMessageFromRedux';


const Dialogs = (props) => {


    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogsItem id={d.id} name={d.name}/>);
    let messageElements = props.dialogsPage.messages.map(m => <Messages messag={m.message}/>);

    let sendMessage = (values) => {
        props.sendMessages(values.newMessageBody);

    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}

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

