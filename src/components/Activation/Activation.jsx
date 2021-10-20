import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";

//? Css
import s from "./Activation.module.css";

//? Utils
import { Icons } from "./../../utils/Icons/Icons";

//? Selectors
import { getTheme } from "../../redux/AppReducer/app-selectors";

//? Reducers
import { Verification } from "./../../redux/AuthReducer/auth-reducer";

//? Components
import Footer from "./../common/Footer/Footer";
import { getErrorActivate } from "../../redux/AuthReducer/auth-selectors";

const Activation = (props) => {
  let email = localStorage.getItem("email");

  let [error, setError] = useState(true);

  let list = ["2", "3", "4", "5", "6", "7"];

  let res = Icons(props.theme);

  const handleChangeInput = (x) => {
    x.value = x.value.replace(/[^a-zA-Z0-9]+/g, "");
    x.value = x.value.toUpperCase();

    let value = x.value;

    if (value.length > 2) {
      if (value.length > 6) {
        value = value.substr(0, 6);
      }

      let arrValue = value.split("");
      let j = 0;

      for (let i = x.id.substr(4, 4); i <= value.length; i++) {
        let e = document.getElementById("id00" + i);
        e.value = arrValue[j];
        j++;
      }
    } else {
      if (value == "") {
        x.value = "";
      } else {
        let arrValue = value.split("");
        x.value = arrValue[arrValue.length - 1];
      }
    }
    let isReady = 1;
    let code = [];
    for (let i = 1; i < 7; i++) {
      let e = document.getElementById("id00" + i);
      if (e.value) {
        code.push(e.value);
        isReady++;
      }
    }
    if (isReady == 7) {
      props.Verification(code.join(""));
      setError(true);
    }
  };

  const Jump = (field, autoMove) => {
    let e;
    if (field.value == "") {
      if (autoMove == 2) {
        e = document.getElementById("id00" + String(autoMove - 1));
      } else {
        e = document.getElementById("id00" + String(autoMove - 2));
      }
    } else {
      if (autoMove == 7) {
        e = document.getElementById("id00" + String(autoMove - 1));
      } else {
        e = document.getElementById("id00" + autoMove);
      }
    }
    e.focus();
    e.selectionStart = e.value.length;
    setError(false);
  };

  return (
    <div className={s.activationPage}>
      <div className={s.main}>
        <div className={email ? s.activationBlock : s.nothingActivateBlock}>
          <header className={s.header}>
            <img src={res["mail"]} alt="mail" />
            <div className={s.title}>
              {email
                ? "Enter confirmation code"
                : props.errorActivate == false
                ? "Profile activated"
                : "Nothing To Activate"}
            </div>
          </header>
          <div
            className={
              email ? s.activationBlockContent : s.nothingActivateBlockContents
            }
          >
            <div className={s.prevText}>
              {email
                ? `We have sent a 6-digit code to ${email}. Please confirm that the
                number is yours to keep your account safe.`
                : props.errorActivate == false
                ? "There is very little left, you just need to log into your account:)"
                : "To activate your account, you first need to register it"}
            </div>
            {email && (
              <div className={s.inputFieldBlock}>
                {list.map((item, index) => (
                  <input
                    className={
                      s.inputField +
                      " " +
                      (props.error & error && s.inputFieldError)
                    }
                    type="text"
                    id={"id00" + (index + 1)}
                    onChange={(e) => {
                      Jump(e.target, item);
                      handleChangeInput(e.target);
                    }}
                    // onFocus={() => {
                    //   setError(false);
                    // }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={s.activationBlockButtons}>
            <span className={s.regText}>
              {email
                ? "Already have an account?"
                : props.errorActivate == false
                ? "Log into account"
                : "Register an account"}
            </span>
            <NavLink
              className={s.regLink}
              to={
                email || props.errorActivate == false ? "/login" : "/register"
              }
            >
              {email || props.errorActivate == false ? "Login" : "Register"}
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    errorActivate: getErrorActivate(state),
  };
};
let ActivationContainer = compose(connect(mapStateToProps, { Verification }))(
  Activation
);
let ActivationReduxForm = reduxForm({
  form: "activation",
})(ActivationContainer);

export default ActivationReduxForm;
