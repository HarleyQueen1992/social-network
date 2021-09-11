import React from "react";
import { Field, reduxForm, formValueSelector, formValues } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import s from "./../../common/FromsControls/FormContainer.module.css";
import l from "./RegisterForm.module.css";
import { NavLink } from "react-router-dom";
import {
  createField,
  Input,
  Textarea,
} from "./../../common/FromsControls/FormsControls";
import { connect } from "react-redux";

let maxLength50 = maxLengthCreator(20);
const RegisterForm = (props) => {
  // let history = useHistory()
  // if (props.isAuth) {
  //   history.push("/profile")
  // }
  return (
    <form className={l.registerForm} onSubmit={props.handleSubmit}>
      <header className={l.header}>
        <span className={l.title}>Mosset</span>
        <h2 className={l.headerText}>
          Register to learn new things and share interesting.
        </h2>
      </header>
      <div className={l.inputsBlock}>
        <div className={l.emailField}>
          {createField("", "email", [], Input, {
            type: "text",
            placeholderValue: "email",
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
            placeholderValue: "email",
            // value: props.passwordValues,
          })}
          {/* <Field
            className={l.inputField}
            placeholder={"Email"}
            name={"email"}
            component="input"
            validate={[required]}
          /> */}
        </div>
        <div className={l.emailField}>
          {createField("", "login", [], Input, {
            type: "text",
            placeholderValue: "login",
            // onFocus: () => {
            //   document.getElementById("placeholder__login").style.cssText =
            //     "line-height: 16px; transform: scale(0.83333) translateY(-9px);";
            // },
            // onBlur: () => {
            //   if (!props.loginValues) {
            //     document.getElementById("placeholder__login").style.cssText =
            //       "transform: scale(1) translateY(7px);";
            //   }
            // },
          })}
          {/* <Field
            className={l.inputField}
            placeholder={"login"}
            name={"login"}
            component="input"
            validate={[required]}
          /> */}
        </div>{" "}
        <div className={l.passwordField}>
          {createField("", "password1", [], Input, {
            type: "password",
            placeholderValue: "password",
            // onFocus: () => {
            //   document.getElementById("placeholder__password").style.cssText =
            //     "line-height: 16px; transform: scale(0.83333) translateY(-9px);";
            // },
            // onBlur: () => {
            //   if (!props.password1Values) {
            //     document.getElementById("placeholder__password").style.cssText =
            //       "transform: scale(1) translateY(7px);";
            //   }
            // },
          })}
          {/* <Field
            className={l.inputField}
            placeholder={"Password"}
            name={"password1"}
            component="input"
            type="password"
            validate={[required]}
          /> */}
        </div>
        <div className={l.passwordField}>
          {createField("", "password2", [], Input, {
            type: "password",
            placeholderValue: "repeat password",
            // onFocus: () => {
            //   document.getElementById(
            //     "placeholder__repeat password"
            //   ).style.cssText =
            //     "line-height: 16px; transform: scale(0.83333) translateY(-9px);";
            // },
            // onBlur: () => {
            //   if (!props.password2Values) {
            //     document.getElementById(
            //       "placeholder__repeat password"
            //     ).style.cssText = "transform: scale(1) translateY(7px);";
            //   }
            // },
          })}
          {/* <Field
            className={l.inputField}
            placeholder={"Repeat password"}
            name={"password2"}
            component="input"
            type="password"
            validate={[required]}
          /> */}
        </div>
      </div>
      <div className={l.bottomBlock}>
        <button className={l.registerBut}>Register</button>

        {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        <div className={l.register}>
          <span className={l.regText}>Already have an account?</span>
          <NavLink className={l.regLink} to={"/login"}>
            Login
          </NavLink>
        </div>
      </div>
    </form>
  );
};
let RegisterReduxForm = reduxForm({
  form: "register",
})(RegisterForm);

const selector = formValueSelector("register"); // <-- same as form name
RegisterReduxForm = connect((state) => {
  // can select values individually
  const emailValues = selector(state, "email");
  const loginValues = selector(state, "login");
  const password1Values = selector(state, "password1");
  const password2Values = selector(state, "password2");
  return {
    emailValues,
    loginValues,
    password1Values,
    password2Values,
  };
})(RegisterReduxForm);

export default RegisterReduxForm;
