import React from "react"
import { connect } from "react-redux"
import { NavLink, Redirect, useHistory } from "react-router-dom"
import { compose } from "redux"
import { authAPI } from "../../API/api"
import { loginIn } from "../../redux/AuthReducer/auth-reducer"
import { getIsAuth } from "../../redux/AuthReducer/auth-selectors"
import LoginReduxForm from "./LoginForm/LoginForm"
import s from "./Login.module.css"

class Login extends React.Component {
  onSubmit = formData => {
    this.props.loginIn(formData.email, formData.password, formData.rememberMe)
  }
  // componentDidUpdate() {
  //   console.log("asdadasdsa")
  //   if (this.props.isAuth) {
  //     return <Redirect to='/profile' />
  //   }
  // }

  render() {
    if (this.props.isAuth) {
      return <Redirect to={"/profile"} />
    }
    return (
      <div className={s.loginBlock}>
        <LoginReduxForm isAuth={this.props.isAuth} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: getIsAuth(state),
  }
}

export default compose(
  connect(mapStateToProps, { loginIn })
  // withRouter,
  // withAuthRedirecr
)(Login)
