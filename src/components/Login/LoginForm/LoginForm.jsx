import React from 'react'
import {Field, reduxForm} from 'redux-form'
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field placeholder={"Email"} name={"email"} component={"input"} />  
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={"input"} />
            </div>
            <div>
                <Field type={"checkbox"} name={"reememberMe"} component={"input"} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div> 

        </form>
    )
}
let LoginReduxForm = reduxForm({
    form:"login"
})(LoginForm)
export default LoginReduxForm;