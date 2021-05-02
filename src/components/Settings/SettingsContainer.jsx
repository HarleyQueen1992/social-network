import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { setTheme } from "./../../redux/AppReducer/app-reducer"
import { getTheme } from "../../redux/AppReducer/app-selectors"
import {
  getUserProfile,
  savePhoto,
  saveProfileInfo,
} from "./../../redux/ProfileReducer/profile-reducer"
import Settings from "./Settings"
import { getProfile } from "../../redux/ProfileReducer/profile-selectors"
import { getProfileInfo } from "../../redux/AuthReducer/auth-selectors"

class SettingsContainer extends React.Component {
  render() {
    return (
      <>
        <Settings
          theme={this.props.theme}
          setTheme={this.props.setTheme}
          savePhoto={this.props.savePhoto}
          saveProfileInfo={this.props.saveProfileInfo}
          profile={this.props.profile}
        />
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    theme: getTheme(state),
    profile: getProfile(state),
    profileInfo: getProfileInfo(state),
  }
}

export default compose(
  connect(mapStateToProps, { setTheme, savePhoto, saveProfileInfo })
)(SettingsContainer)
