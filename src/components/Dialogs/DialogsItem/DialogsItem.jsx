import React from 'react'
import s from './DialogsItem.module.css';
import {NavLink} from "react-router-dom";
import Photo from './../../../assets/images/user.png'


const DialogsItem = (props) => {
    debugger
    return (
        <div className={s.dialog}>
                <div className={s.userAva} >
                    <NavLink to={'/dialogs/' + props.id} activeClassName={s.active}>
                        {props.photos.small === null 
                        ? <img className={s.ava} src={Photo} /> 
                        : <img className={s.ava} src={props.photos.small} /> }   
                    </NavLink>
                </div>
            
            
            
                <div className={s.name} >
                    <NavLink to={'/dialogs/' + props.id} activeClassName={s.active}>
                        {props.name}
                    </NavLink>
                </div>
                        
                
            
        </div>
    )

}



export default DialogsItem
