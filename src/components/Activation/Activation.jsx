import React from "react";
import s from "./Activation.module.css";
import { Icons } from "./../../utils/Icons/Icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../redux/AppReducer/app-selectors";
import Footer from "./../common/Footer/Footer";

const Activation = (props) => {
  let res = Icons(props.theme);
  const handleChangeInput = (x) => {
    let value = x.value;
    x.value = value.replace(/[^a-zA-Z0-9]+/g, "");
    x.value = x.value.toUpperCase();
  };
  const Jump = (field, autoMove) => {
    if (field.value == "") {
      if (autoMove == 2) {
        document.getElementById("id00" + String(autoMove - 1)).focus();
      } else {
        document.getElementById("id00" + String(autoMove - 2)).focus();
      }
    } else {
      if (autoMove == 7) {
        document.getElementById("id00" + String(autoMove - 1)).focus();
      } else {
        document.getElementById("id00" + autoMove).focus();
      }
    }
    // }
  };
  return (
    <div className={s.activationPage}>
      <div className={s.main}>
        <div className={s.activationBlock}>
          <header className={s.header}>
            <img src={res["mail"]} alt="mail" />
            <div className={s.title}>Enter confirmation code</div>
          </header>
          <div className={s.activationBlockContent}>
            <div className={s.prevText}>
              We have sent a 6-digit code to osadcijartem84@gmail.com. Please
              confirm that the number is yours to keep your account safe.
            </div>
            <div className={s.inputFieldBlock}>
              <input
                type="text"
                id="id001"
                onChange={(e) => {
                  Jump(e.target, "2");
                }}
                onInput={(e) => {
                  handleChangeInput(e.target);
                }}
                maxLength="1"
              />
              <input
                type="text"
                id="id002"
                onChange={(e) => {
                  Jump(e.target, "3");
                }}
                onInput={(e) => {
                  handleChangeInput(e.target);
                }}
                maxLength="1"
              />
              <input
                id="id003"
                onChange={(e) => {
                  Jump(e.target, "4");
                }}
                type="text"
                onInput={(e) => {
                  handleChangeInput(e.target);
                }}
                maxLength="1"
              />
              <input
                id="id004"
                onChange={(e) => {
                  Jump(e.target, "5");
                }}
                type="text"
                onInput={(e) => {
                  handleChangeInput(e.target);
                }}
                maxLength="1"
              />
              <input
                id="id005"
                onChange={(e) => {
                  Jump(e.target, "6");
                }}
                type="text"
                onInput={(e) => {
                  handleChangeInput(e.target);
                }}
                maxLength="1"
              />
              <input
                id="id006"
                onChange={(e) => {
                  Jump(e.target, "7");
                }}
                type="text"
                onInput={(e) => {
                  handleChangeInput(e.target);
                }}
                maxLength="1"
              />
            </div>
          </div>
          <div className={s.activationBlockButtons}>
            <span className={s.regText}>Already have an account?</span>
            <NavLink className={s.regLink} to={"/login/"}>
              Login
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
  };
};

export default compose(connect(mapStateToProps, {}))(Activation);
