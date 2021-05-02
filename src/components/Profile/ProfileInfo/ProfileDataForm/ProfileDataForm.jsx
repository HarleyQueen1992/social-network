import React from "react"
import {
  createField,
  Input,
  Textarea,
} from "../../../common/FromsControls/FormsControls"
// import st from "./../../../common/FromsControls/FormContainer.module.css"
import s from "./ProfileDataForm.module.css"
import { reduxForm } from "redux-form"

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit} className={s.deploy}>
      <div className={s.fieldInput}>
        <span>Full name</span>:{" "}
        {createField("Full name", "fullName", [], Input)}
      </div>
      <div className={s.fieldInput}>
        <span>Looking for a job:</span>{" "}
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>

      <div className={s.fieldInput}>
        <span>My professional skills:</span>
        {createField(
          "My professional skills",
          "LookingForAJobDescription",
          [],
          Textarea
        )}
      </div>

      <div className={s.fieldInput}>
        <span>About me</span>:{createField("About me", "aboutMe", [], Textarea)}
      </div>
      {/* <div>
        <b>Contacts : </b>{" "}
        {Object.keys(profile.contacts).map(key => {
          return (
            <div>
              <b>
                {key} : {createField(key, "contacts." + key, [], Input)}
              </b>{" "}
            </div>
          )
        })}
      </div> */}
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
