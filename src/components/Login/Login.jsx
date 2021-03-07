import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { authAPI } from '../../API/api'
import { loginIn } from '../../redux/AuthReducer/auth-reducer'
import { getIsAuth } from '../../redux/AuthReducer/auth-selectors'
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
        isAuth: getIsAuth(state)
    }
}

export default compose(
    connect(mapStateToProps,{loginIn}),
    // withRouter,
    // withAuthRedirecr
)(Login)
