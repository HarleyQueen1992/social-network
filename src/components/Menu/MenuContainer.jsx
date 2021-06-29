import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getTheme } from "../../redux/AppReducer/app-selectors"
import { logOut } from "../../redux/AuthReducer/auth-reducer"
import Menu from "./Menu"

class MenuContainer extends React.Component {
  render() {
    return (
      <>
        <Menu 
            theme={this.props.theme}
            logOut={this.props.logOut} />
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    theme: getTheme(state),
  }
}

export default compose(connect(mapStateToProps, { logOut}))(MenuContainer)
