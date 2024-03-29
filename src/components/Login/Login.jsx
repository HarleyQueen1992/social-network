import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { loginIn } from "../../redux/AuthReducer/auth-reducer";
import { getIsAuth } from "../../redux/AuthReducer/auth-selectors";
import LoginReduxForm from "./LoginForm/LoginForm";
import s from "./Login.module.css";
import Footer from "./../common/Footer/Footer";

class Login extends React.Component {
  onSubmit = (formData) => {
    this.props.loginIn(formData.email, formData.password, formData.rememberMe);
  };
  // componentDidMount() {
  //   let login = document.getElementById("input__email");
  //   login.type = "text";
  //   login.removeAttribute("autocomplete");
  //   login.value = "";
  //   let password = document.getElementById("input__password");
  //   password.removeAttribute("autocomplete");
  //   password.value = "";
  //   // password.type = "password";
  // }
  render() {
    // if (this.props.isAuth) {
    //   return <Redirect to="/news" />;
    // }
    return (
      <div className={s.loginPage}>
        <main className={s.main}>
          <div className={s.loginBlock}>
            <LoginReduxForm
              isAuth={this.props.isAuth}
              onSubmit={this.onSubmit}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
  };
};

export default compose(connect(mapStateToProps, { loginIn }))(Login);
