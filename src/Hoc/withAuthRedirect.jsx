import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//? Selectors imports
import { getIsAuth } from "./../redux/AuthReducer/auth-selectors";

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export const withAuthRedirecr = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) {
        return <Redirect to="/login" />;
      }

      return <Component {...this.props} />;
    }
  }

  let ConnectedAuthRedirectComponent =
    connect(mapStateToProps)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};
