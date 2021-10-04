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
        // e.focus();
        // e.onfocus();
        j++;
      }
    } else {
      if (value == "") {
        x.value = "";
      } else {
        let arrValue = value.split("");
        x.value = arrValue[arrValue.length - 1];
        // debugger;
      }

      // debugger;
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

    // e.setSelectionRange(-1, -1);
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
                  handleChangeInput(e.target);
                }}
              />
              <input
                type="text"
                id="id002"
                onChange={(e) => {
                  Jump(e.target, "3");
                  handleChangeInput(e.target);
                }}
              />
              <input
                id="id003"
                onChange={(e) => {
                  Jump(e.target, "4");
                  handleChangeInput(e.target);
                }}
                type="text"
                // maxLength="1"
              />
              <input
                id="id004"
                onChange={(e) => {
                  Jump(e.target, "5");
                  handleChangeInput(e.target);
                }}
                type="text"
              />
              <input
                id="id005"
                onChange={(e) => {
                  Jump(e.target, "6");
                  handleChangeInput(e.target);
                }}
                type="text"
              />
              <input
                id="id006"
                onChange={(e) => {
                  Jump(e.target, "7");
                  handleChangeInput(e.target);
                }}
                type="text"
              />
            </div>
          </div>
          <div className={s.activationBlockButtons}>
            <span className={s.regText}>Already have an account?</span>
            <NavLink className={s.regLink} to={"/login"}>
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
