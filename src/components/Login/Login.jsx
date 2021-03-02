import React from 'react'
import { connect } from 'react-redux'
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
            <LoginReduxForm onSubmit={this.onSubmit}/>
        )
    }
    
}

const mapStateToProps = () => {
    return {

    }
}

export default compose(
    connect(mapStateToProps,{loginIn}),
    // withRouter,
    // withAuthRedirecr
)(Login)
