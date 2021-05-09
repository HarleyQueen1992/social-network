import React from "react"
import { connect } from "react-redux"
import { NavLink, Redirect, useHistory } from "react-router-dom"
import { compose } from "redux"
const Registration = props => {
  return <div>Register</div>
}
const mapStateToProps = state => {
  return {}
}

export default compose(connect(mapStateToProps, {}))(Registration)
