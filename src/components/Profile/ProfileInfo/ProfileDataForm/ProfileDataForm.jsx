import React from 'react';
import { createField, Input, Textarea } from '../../../common/FromsControls/FormsControls';
import st from './../../../common/FromsControls/FormContainer.module.css'
import s from './../ProfileInfo.module.css';
import {reduxForm} from 'redux-form'

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit} className={s.deploy} >
        <div>
            <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: { createField("", "lookingForAJob", [], Input, {type: "checkbox"} )}
        </div>

        <div>
            <b>My professional skills</b>:
            { createField("My professional skills", "LookingForAJobDescription", [], Textarea  )}
        </div>


        <div>
            <b>About me</b>:
            { createField("About me", "aboutMe", [], Textarea  )}
        </div>
        <div>
        <b>Contacts : </b> {Object.keys(profile.contacts).map(key => {
                        return <div ><b>{key} : {createField(key, "contacts." + key, [], Input)}</b> </div>
                    })}
        </div>
                <div>
                    <button className={s.saveBut} >save</button>
                </div>
                { error && <div className={st.formSummaryError} >
                {error}
            </div>}  
            </form>
}

const ProfileDataFormReduxForm = reduxForm({form:'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm