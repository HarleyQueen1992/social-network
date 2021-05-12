import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getInnerHeight } from "./../redux/AppReducer/app-selectors"

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  height: getInnerHeight(state),
})

export const withAuthRedirecr = Component => {
  class RedirectComponent extends React.Component {
    render() {
      if (window.innerHeight < this.props.height)
        return <Redirect to='/login' />

      return <Component {...this.props} />
    }
  }

  let ConnectedAuthRedirectComponent =
    connect(mapStateToProps)(RedirectComponent)

  return ConnectedAuthRedirectComponent
}
