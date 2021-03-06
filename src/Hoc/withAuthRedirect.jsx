import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirecr = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            debugger
            if (this.props.isAuth === false) return <Redirect to='/login' />

            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}

