import React from "react"
import { Field, reduxForm } from "redux-form"
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators"
import { Input } from "../../common/FromsControls/FormsControls"
import s from "./../../common/FromsControls/FormContainer.module.css"
import l from "./LoginForm.module.css"
import { NavLink, Redirect, useHistory } from "react-router-dom"

let maxLength = maxLengthCreator(25)

const LoginForm = props => {
  // let history = useHistory()
  // if (props.isAuth) {
  //   history.push("/profile")
  // }
  return (
    <form className={l.loginForm} onSubmit={props.handleSubmit}>
      <header className={l.header}>
        <span className={l.title}>Mosset</span>
      </header>
      <div className={l.inputsBlock}>
        <div className={l.emailField}>
          <Field
            className={l.inputField}
            placeholder={"Email"}
            name={"email"}
            component='input'
            validate={[required, maxLength]}
          />
        </div>
        <div className={l.passwordField}>
          <Field
            className={l.inputField}
            placeholder={"Password"}
            name={"password"}
            component='input'
            type='password'
            validate={[required, maxLength]}
          />
        </div>
      </div>
      <div className={l.bottomBlock}>
        <button className={l.loginBut}>Login</button>
        <div className={l.or}>
          <span className={l.orText}>or</span>
        </div>

        <div className={l.forgotYourPassword}>
          <NavLink to='#'>Forgot your password?</NavLink>
        </div>
        {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        <div className={l.register}>
          <span className={l.regText}>You don't have an account yet?</span>
          <NavLink className={l.regLink} to={"/register/"}>
            Register
          </NavLink>
        </div>
      </div>
    </form>
  )
}
let LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm)
export default LoginReduxForm
