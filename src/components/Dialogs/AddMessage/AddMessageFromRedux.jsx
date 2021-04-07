import React from 'react'
import s from './AddMessageFromRedux.module.css'
import {Field, reduxForm} from 'redux-form'
import { required } from '../../../utils/validators/validators'


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.bottom}>
                <Field className={s.input} component={"input"} name="newMessageBody" placeholder="Enter you message" validate={[required]}/>
                <button className={s.but}>Submit</button>
            </div>
        </form>
    )
}

const AddMessageFromRedux = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm)

export default AddMessageFromRedux