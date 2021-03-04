import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { authAPI } from '../../API/api'
import { loginIn } from '../../redux/auth-reducer'
import LoginReduxForm from './LoginForm/LoginForm'

class Login extends React.Component {

    componentDidMount() {

    }

    onSubmit = (formData) => {
        this.props.loginIn(formData.email, formData.password)

    }

    render () {
        return (
            this.props.isAuth ? <Redirect to={"/profile"} /> : <LoginReduxForm onSubmit={this.onSubmit}/>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps,{loginIn}),
    // withRouter,
    // withAuthRedirecr
)(Login)
