import React from "react";
import { Field, reduxForm, formValueSelector, formValues } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { createField, Input } from "./../../common/FromsControls/FormsControls";
import s from "./LoginForm.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

let maxLength = maxLengthCreator(25);

const LoginForm = (props) => {
  return (
    <form className={s.loginForm} onSubmit={props.handleSubmit}>
      <header className={s.header}>
        <span className={s.title}>Mosset</span>
      </header>
      <div className={s.inputsBlock}>
        {/* <div className={s.emailField}>
          <Field
            className={s.inputField}
            placeholder={"Email"}
            name={"email"}
            component="input"
          /> */}
        {createField("", "email", [], Input, {
          error: props.error,
          value: props.emailValues,
          placeholderValue: "email",
          type: "text",
          autocomplete: "nope",

          // onFocus: () => {
          //   document.getElementById("placeholder__email").style.cssText =
          //     "line-height: 16px; transform: scale(0.83333) translateY(-9px);";
          // },
          // onBlur: () => {
          //   if (!props.emailValues) {
          //     document.getElementById("placeholder__email").style.cssText =
          //       "transform: scale(1) translateY(7px);";
          //   }
          // },
        })}
        {/* </div> */}
        <div className={s.passwordField}>
          {/* <Field
            className={s.inputField}
            placeholder={"Password"}
            name={"password"}
            component="input"
            type="password"
          /> */}
          {createField("", "password", [], Input, {
            error: props.error,
            type: "password",
            // onFocus: () => {
            //   document.getElementById("placeholder__password").style.cssText =
            //     "line-height: 16px; transform: scale(0.83333) translateY(-9px);";
            // },
            // onBlur: () => {
            //   if (!props.passwordValues) {
            //     document.getElementById("placeholder__password").style.cssText =
            //       "transform: scale(1) translateY(7px);";
            //   }
            // },
            placeholderValue: "password",
            autocomplete: "nope",
            value: props.passwordValues,
          })}
        </div>
      </div>
      <div className={s.bottomBlock}>
        <button className={s.loginBut}>Login</button>
        <div className={s.or}>
          <span className={s.orText}>or</span>
        </div>

        <div className={s.forgotYourPassword}>
          <NavLink to="#">Forgot your password?</NavLink>
        </div>
        {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        <div className={s.register}>
          <span className={s.regText}>You don't have an account yet?</span>
          <NavLink className={s.regLink} to={"/register/"}>
            Register
          </NavLink>
        </div>
      </div>
    </form>
  );
};
let LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

// const ItemList = formValues("email")(LoginReduxForm);

const selector = formValueSelector("login"); // <-- same as form name
LoginReduxForm = connect((state) => {
  // can select values individually
  const emailValues = selector(state, "email");
  const passwordValues = selector(state, "password");
  return {
    emailValues,
    passwordValues,
  };
})(LoginReduxForm);

export default LoginReduxForm;
