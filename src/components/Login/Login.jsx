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
      <div className={s.loginPage}>
        <main className={s.main}>
          <div className={s.loginBlock}>
            <LoginReduxForm
              isAuth={this.props.isAuth}
              onSubmit={this.onSubmit}
            />
          </div>
          {/* <div className={s.register}>
            <span className={s.regText}>You don't have an account yet?</span>
            <NavLink className={s.regLink} to={"register"}>
              Register
            </NavLink>
          </div> */}
        </main>

        <footer className={s.footer}>
          <div className={s.top}>
            <span>Информация</span>
            <span>Блог</span>
            <span>Вакансии</span>
            <span>Помощь</span>
            <span>API</span>
            <span>Конфиденциальность</span>
            <span>Условия</span>
            <span>Популярные аккаунты</span>
            <span>Хэштеги</span>
            <span>Места</span>
          </div>
          <div className={s.bot}>
            <span>Языки</span>
            <span>©Mosset от Facebook, 2021</span>
          </div>
        </footer>
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
