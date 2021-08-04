import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import s from "./../../common/FromsControls/FormContainer.module.css";
import l from "./RegisterForm.module.css";
import { NavLink } from "react-router-dom";

const RegisterForm = (props) => {
  // let history = useHistory()
  // if (props.isAuth) {
  //   history.push("/profile")
  // }
  return (
    <form className={l.loginForm} onSubmit={props.handleSubmit}>
      <header className={l.header}>
        <span className={l.title}>Mosset</span>
        <h2 className={l.headerText}>
          Register to learn new things and share interesting.
        </h2>
      </header>
      <div className={l.inputsBlock}>
        <div className={l.emailField}>
          <Field
            className={l.inputField}
            placeholder={"Email"}
            name={"email"}
            component="input"
            validate={[required]}
          />
        </div>
        <div className={l.emailField}>
          <Field
            className={l.inputField}
            placeholder={"login"}
            name={"login"}
            component="input"
            validate={[required]}
          />
        </div>{" "}
        <div className={l.passwordField}>
          <Field
            className={l.inputField}
            placeholder={"Password"}
            name={"password1"}
            component="input"
            type="password"
            validate={[required]}
          />
        </div>
        <div className={l.passwordField}>
          <Field
            className={l.inputField}
            placeholder={"Repeat password"}
            name={"password2"}
            component="input"
            type="password"
            validate={[required]}
          />
        </div>
        <div className={l.emailField}>
          <Field
            className={l.textareaField}
            placeholder={"AboutMe"}
            name={"aboutMe"}
            component="textarea"
            validate={[required]}
          />
        </div>
        <div className={l.emailField}>
          <Field
            className={l.inputField}
            placeholder={"date"}
            name={"birthday"}
            component="input"
            type="date"
            validate={[required]}
          />
        </div>
        <div className={l.emailField}>
          <Field
            className={l.inputField}
            placeholder={"location"}
            name={"location"}
            component="input"
            type="text"
            validate={[required]}
          />
        </div>
      </div>
      <div className={l.bottomBlock}>
        <button className={l.loginBut}>Register</button>

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
