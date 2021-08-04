import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import RegisterReduxForm from "./RegisterForm/RegisterForm";
import s from "./Registration.module.css";
import Footer from "./../common/Footer/Footer";
import { register } from "./../../redux/AuthReducer/auth-reducer";

class Registration extends React.Component {
  onSubmit = (formData) => {
    this.props.register(
      formData.email,
      formData.login,
      formData.password1,
      formData.password2,
      formData.aboutMe,
      formData.birthday,
      formData.location
    );
  };
  render() {
    return (
      <div className={s.registerPage}>
        <main className={s.main}>
          <div className={s.loginBlock}>
            <RegisterReduxForm onSubmit={this.onSubmit} />
            {/* <LoginReduxForm isAuth={this.props.isAuth} onSubmit={this.onSubmit} /> */}
          </div>
          {/* <div className={s.register}>
            <span className={s.regText}>You don't have an account yet?</span>
            <NavLink className={s.regLink} to={"register"}>
              Register
            </NavLink>
          </div> */}
        </main>

        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default compose(connect(mapStateToProps, { register }))(Registration);
