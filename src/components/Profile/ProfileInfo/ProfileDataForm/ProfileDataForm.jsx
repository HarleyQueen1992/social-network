import React from "react"
import {
  createField,
  Input,
  Textarea,
} from "../../../common/FromsControls/FormsControls"
// import st from "./../../../common/FromsControls/FormContainer.module.css"
import s from "./ProfileDataForm.module.css"
import { reduxForm } from "redux-form"
import { Redirect } from "react-router-dom"
import GitHub from "../../../../assets/images/github.png"
import vk from "../../../../assets/images/vk.png"
import facebook from "../../../../assets/images/facebook.png"
import inst from "../../../../assets/images/inst.png"
import twitter from "../../../../assets/images/twitter.png"
import youtube from "../../../../assets/images/youtube.png"

export const Icons = {
  github: GitHub,
  vk: vk,
  facebook: facebook,
  instagram: inst,
  twitter: twitter,
  youtube: youtube,
}

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit} className={s.deploy}>
      <div className={s.fieldInput}>
        <span>Full name:</span>{" "}
        {createField("Full name", "fullName", [], Input, { type: "text" })}
      </div>
      <div className={s.fieldInput}>
        <span>Looking for a job:</span>{" "}
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
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
              <div className={s.fieldInputContacts}>
                <img className={s.logo} src={Icons[key]} />
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
        <button className={s.saveBut}>save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
    </form>
  )
}

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
)

export default ProfileDataFormReduxForm
