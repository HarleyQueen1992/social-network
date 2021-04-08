import React from 'react'
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Messages from "./Messages/Messages";
import AddMessageFromRedux from './AddMessage/AddMessageFromRedux';
import enclosure  from './../../assets/images/enclosure.png'
import micro from './../../assets/images/micro.png'

const Dialogs = (props) => {


    let dialogsElements = props.dialogsPage.friendsInDialogs.map(d => <DialogsItem photo={d.photo} id={d.id} name={d.name}/>);
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
                <div className={s.header}>
                    <div className={s.userName} >Name</div>
                    <div className={s.wasOnline} >был в сети час назад</div> 
                </div>
                <div className={s.body} >
                    {messageElements}

                </div>
                <div className={s.bot} >
                    <div className={s.adding} >
                        <img className={s.enclosure} src={enclosure}/>
                    </div>
                    <div className={s.form} >
                        <AddMessageFromRedux onSubmit={sendMessage} />
                    </div>
                    <div className={s.micro} >
                        <img className={s.microImg} src={micro}/>

                    </div>
                    
                </div>
            </div>
            <div className={s.other}>
                content
            </div>
        </div>
    )
}

export default Dialogs

