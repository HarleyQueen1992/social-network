import React from "react";
import { Field, reduxForm } from "redux-form";
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
          <NavLink className={l.regLink} to={"/login/"}>
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
export default RegisterReduxForm;
