import React from 'react';
import p from './AddPostFormRedux.module.css'

import {Field, reduxForm} from 'redux-form'
import { required } from '../../../../utils/validators/validators';

const addNewMessagePost = (props) => {
    return (
        <form className={p.postsBlock} onSubmit={props.handleSubmit} >
            <div className={p.postsBlock} >   
                <Field className={p.postForm} component="input" name="newPostText" placeholder="What's new" validate={[required]}/>       
                <button className={p.but}>Add</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: "profileAddPostForm"})(addNewMessagePost)

export default AddPostFormRedux;