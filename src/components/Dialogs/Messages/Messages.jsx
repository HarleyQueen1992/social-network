import React from 'react'
import s from './Message.module.css';

const Messages = (props) => {
    return (
            <div className={s.message}>
                <div className={s.mg} >
                    <img className={s.imeges} src="https://i.pinimg.com/236x/7c/ab/18/7cab184c5e791921ed607e23458492b6.jpg" />
                    {props.messag}
                </div>
            </div>
    )
}

export default Messages;
