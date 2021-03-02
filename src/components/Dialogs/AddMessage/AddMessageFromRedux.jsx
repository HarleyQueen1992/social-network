import React from 'react'
import s from './AddMessageFromRedux.module.css'
import {Field, reduxForm} from 'redux-form'

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.bottom}>
                <Field component="textarea" name="newMessageBody" placeholder="Enter you message" />
                <button className={s.but}>Submit</button>
            </div>
        </form>
    )
}

const AddMessageFromRedux = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm)

export default AddMessageFromRedux