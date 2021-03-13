import React from 'react'
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Messages from "./Messages/Messages";
import AddMessageFromRedux from './AddMessage/AddMessageFromRedux';
import { createPages } from '../../utils/pagination';
import Pagination from './../common/Pagination/Pagination'
import arrowBot from './../../assets/images/arrow_bottom.png'
import arrowTop from './../../assets/images/arrow_top.png'

const Dialogs = (props) => {
    debugger


    let dialogsElements = props.dialogsPage.friends.map(d => <DialogsItem photos={d.photos} id={d.id} name={d.name}/>);
    let messageElements = props.dialogsPage.messages.map(m => <Messages messag={m.message}/>);

    let pagesCount = Math.ceil(props.totalFriendsCount / props.pageSize);

    let page = []
    // let FriendsElements = props.friends === null ? <Preloader/> : props.friends.map( f => <FriendsPage name={f.fullName}/>);
    createPages(page, pagesCount, props.currentFriend)

    let sendMessage = (values) => {
        props.sendMessageActionCreator(values.newMessageBody);

    }
    return (
        <div className={s.dialogs}>
   
            <div className={s.dialogsItem}>
                <span  className={s.switch} >
                    {props.currentFriend > 1 
                    ? <img onClick={ () => {props.earlyFriendNumber()}} className={s.arrowTop} src={arrowTop} />
                    : <h3>Home page</h3>}
                </span>
                <div>
                    {dialogsElements}
                </div>  
                
                <span  className={s.switch} >
                    {pagesCount === props.currentFriend
                    ? <h3>Last page</h3>
                    :<img onClick={() => {props.increaseFriendNumber()}} className={s.arrowBot} src={arrowBot}/>}

                </span>

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
            {/* <Pagination currentPage={props.currentFriend} 
                        page={page} 
                        earlyPageNumber={props.earlyFriendNumber} 
                        onPageChenged={props.onPageChenged} 
                        increasePageNumber={props.increaseFriendNumber}/> */}
        </div>
    )
}

export default Dialogs

