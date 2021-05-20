import React from "react"
import {
  createField,
  Input,
  Textarea,
} from "../../../common/FromsControls/FormsControls"
import s from "./ProfileDataForm.module.css"
import { reduxForm, Field } from "redux-form"
import { Icons, IconsWhite } from "./../../../../utils/Icons/Icons"

const ProfileDataForm = ({ handleSubmit, profile, error, theme }) => {
  return (
    <form onSubmit={handleSubmit} className={s.deploy}>
      <div className={s.fieldInput}>
        <span>Full name:</span>{" "}
        {createField("Full name", "fullName", [], Input, { type: "text" })}
      </div>
      <div className={s.fieldInput}>
        <span>Looking for a job:</span>{" "}
        <Field
          id='check'
          className={theme == "lightTheme" ? s.inputCheck : s.inputCheckW}
          name='lookingForAJob'
          component='input'
          type='checkbox'
        />
        <label htmlFor='check' className={s.labelCheckbox}></label>
      </div>

      <div className={s.fieldInput}>
        <span>My professional skills:</span>
        {createField(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea,
          { type: "text" }
        )}
      </div>

      <div className={s.fieldInput}>
        <span>About me:</span>
        {createField("About me", "aboutMe", [], Textarea, { type: "text" })}
      </div>
      <div className={s.contactsBlcok}>
        <span className={s.contactTitle}>Contacts : </span>{" "}
        <div className={s.contacts}>
          {Object.keys(profile.contacts).map(key => {
            return (
              <div className={s.fieldInputContacts} key={key}>
                <img
                  alt='contactsImg'
                  className={s.logo}
                  src={theme == "lightTheme" ? Icons[key] : IconsWhite[key]}
                />
                <span className={s.title}>{key} :</span>{" "}
                {createField(key, "contacts." + key, [], Input, {
                  type: "text",
                })}{" "}
              </div>
            )
          })}
        </div>
      </div>
      <div className={s.saveBlock}>
        {error && <div className={s.formSummaryError}>{error}</div>}
        <button className={s.saveBut}>Save</button>
      </div>
    </form>
  )
}

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
)

export default ProfileDataFormReduxForm
