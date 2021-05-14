import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import RegisterReduxForm from "./RegisterForm/RegisterForm"
import s from "./Registration.module.css"
import Footer from "./../common/Footer/Footer"

const Registration = props => {
  return (
    <div className={s.registerPage}>
      <main className={s.main}>
        <div className={s.loginBlock}>
          <RegisterReduxForm />
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
  )
}
const mapStateToProps = state => {
  return {}
}

export default compose(connect(mapStateToProps, {}))(Registration)
