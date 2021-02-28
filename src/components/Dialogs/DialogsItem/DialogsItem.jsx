import React from 'react'
import s from './DialogsItem.module.css';
import {NavLink} from "react-router-dom";


const DialogsItem = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/' + props.id} activeClassName={s.active}><img className={s.ava} src="https://i.pinimg.com/originals/0e/1e/74/0e1e74ce635b2b22f0627c53f7b88eae.jpg" />{props.name}</NavLink>
        </div>
    )

}



export default DialogsItem
