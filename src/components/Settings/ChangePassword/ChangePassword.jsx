import React from "react"
import s from "./ChangePassword.module.css"
import { createField, Input } from "./../../common/FromsControls/FormsControls"
import { reduxForm, Field } from "redux-form"

const ChangePassword = props => {
  return (
    <form onSubmit={props.handleSubmit} className={s.changePasswordBlock}>
      <span className={s.changeTitle}>Change password:</span>
      <div className={s.chengePassword}>
        <div className={s.passwordField}>
          <span className={s.changePasswordTitle}>Old:</span>
          {createField("old", "passwordOld", [], Input, { type: "password" })}
        </div>
        <div className={s.passwordField}>
          <span className={s.changePasswordTitle}>New:</span>
          {createField("new", "passwordNew", [], Input, { type: "password" })}
        </div>
        <div className={s.passwordField}>
          <span className={s.changePasswordTitle}>Repeat:</span>
          {createField("repeat", "passwordRepeat", [], Input, {
            type: "password",
          })}
        </div>
      </div>
      <div className={s.chenge}>
        {props.errorRR ? (
          <div className={s.error}>Password mismatch</div>
        ) : (
          <div></div>
        )}

        <button className={s.chengeBtn}>Change</button>
      </div>
    </form>
  )
}
const ChangePasswordForm = reduxForm({ form: "change-password" })(
  ChangePassword
)

export default ChangePasswordForm
