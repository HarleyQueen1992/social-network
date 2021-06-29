import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getTheme } from "../../redux/AppReducer/app-selectors"
import Menu from "./Menu"

class MenuContainer extends React.Component {
  render() {
    return (
      <>
        <Menu theme={this.props.theme} />
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    theme: getTheme(state),
  }
}

export default compose(connect(mapStateToProps, {}))(MenuContainer)
