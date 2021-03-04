import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Input } from '../../common/FromsControls/FormsControls'

let maxLength = maxLengthCreator(25)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input} validate={[required, maxLength]} />  
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} type="password" validate={[required, maxLength]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"reememberMe"} component={Input} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div> 

        </form>
    )
}
let LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm)
export default LoginReduxForm;