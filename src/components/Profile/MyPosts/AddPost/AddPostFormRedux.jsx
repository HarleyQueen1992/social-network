import React from 'react';
import p from './AddPostFormRedux.module.css'

import {Field, reduxForm} from 'redux-form'
import { required } from '../../../../utils/validators/validators';

const addNewMessagePost = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>   
                <Field component="textarea" name="newPostText" placeholder="Text Post" validate={[required]}/>       
                <button className={p.but}>Add</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: "profileAddPostForm"})(addNewMessagePost)

export default AddPostFormRedux;