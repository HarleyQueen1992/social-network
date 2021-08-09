import React from "react";
import s from "./Password.module.css";
import { Field, reduxForm } from "redux-form";
import { createField, Input } from "../common/FromsControls/FormsControls";
import { connect } from "react-redux";
import { changePassword } from "./../../redux/ProfileReducer/profile-reducer";

const Password = (props) => {
  const onSubmit = (formData) => {
    props.changePassword(
      formData.oldPassword,
      formData.newPassword1,
      formData.newPassword2
    );
  };
  const closePopup = () => {
    props.setIsPassword(false);
    document.querySelector("body").style.cssText = "overflow: scroll;";
  };
  return (
    <div className={s.passwordOverlay} onClick={closePopup}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={s.passwordBlock}
      >
        <div className={s.passwordTitleBlock}>
          <div className={s.passwordTitle}>Change Password</div>
          <div
            className={s.popupContentHeaderOff}
            onClick={closePopup}
            id="backBlock"
          ></div>
        </div>
        <PasswordReduxForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const PasswordForm = ({ handleSubmit, error }) => {
  return (
    <form className={s.passwordBodyBlock} onSubmit={handleSubmit}>
      <div className={s.passwordFieldBlock}>
        <span>Current password</span>
        {createField(null, "oldPassword", [], Input, { type: "password" })}
      </div>
      <div className={s.passwordFieldBlock}>
        <span>New password</span>
        {createField(null, "newPassword1", [], Input, { type: "password" })}
      </div>
      <div className={s.passwordFieldBlock}>
        <span>Repeat new password</span>
        {createField(null, "newPassword2", [], Input, { type: "password" })}
      </div>
      <div className={s.formSummaryError}>{error && error}</div>
      <div className={s.passwordSubmitBlock}>
        <button className={s.btnSubmit}>Submit</button>
      </div>
    </form>
  );
};

const PasswordReduxForm = reduxForm({ form: "password" })(PasswordForm);
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { changePassword })(Password);
