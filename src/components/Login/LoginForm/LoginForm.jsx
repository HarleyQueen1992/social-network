import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Input } from '../../common/FromsControls/FormsControls'
import s from './../../common/FromsControls/FormContainer.module.css'
import l from './LoginForm.module.css'
import { NavLink, Redirect } from "react-router-dom";

let maxLength = maxLengthCreator(25)


const LoginForm = (props) => {
    return (
        <form className={l.loginForm} onSubmit={props.handleSubmit} >
            <div className={l.emailField} >
                <span>Mail :</span>
                <Field className={l.inputField} placeholder={"Email"} name={"email"} component={Input} validate={[required, maxLength]} />  
            </div>
            <div className={l.emailField} >
                <span>Password :</span>
                <Field className={l.inputField} placeholder={"Password"} name={"password"} component={Input} type="password" validate={[required, maxLength]}/>
            </div>
            <div className={l.emailField} >
                <span>Remember Me</span>
                <Field className={l.inputField} type={"checkbox"} name={"reememberMe"} component={Input} /> 
            </div>
            { props.error && <div className={s.formSummaryError} >
                {props.error}
            </div>}
            <div className={l.butBlock} >
            <button className={l.loginBut} >Login</button>
            </div>  
            

        </form>
    )
}
let LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm)
export default LoginReduxForm;