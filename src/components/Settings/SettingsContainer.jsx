import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { setTheme, setIndex } from "./../../redux/AppReducer/app-reducer"
import { getTheme } from "../../redux/AppReducer/app-selectors"
import { logOut } from "./../../redux/AuthReducer/auth-reducer"
import Settings from "./Settings"
import {
  receiveProfileInfo,
  saveProfileInfo,
  savePhoto,
  clearProfileInfo,
} from "./../../redux/SettingsReducer/settings-reducer"
import {
  getProfileInfo,
  getIsFetching,
  getIsFetchingSuccess,
} from "./../../redux/SettingsReducer/settings-selectors"
import { getUserId } from "../../redux/AuthReducer/auth-selectors"
import Preloader from "../common/Preloader/Preloader"

class SettingsContainer extends React.Component {
  componentDidMount() {
    this.props.receiveProfileInfo(this.props.userid)
  }
  componentWillUnmount() {
    // this.props.clearProfileInfo()
  }

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Settings
            theme={this.props.theme}
            setTheme={this.props.setTheme}
            savePhoto={this.props.savePhoto}
            saveProfileInfo={this.props.saveProfileInfo}
            profile={this.props.profileInfo}
            logOut={this.props.logOut}
            Save={this.Save}
            isFetchingSuccess={this.props.isFetchingSuccess}
            setIndex={this.props.setIndex}
          />
        )}
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    theme: getTheme(state),
    profileInfo: getProfileInfo(state),
    userid: getUserId(state),
    isFetching: getIsFetching(state),
    isFetchingSuccess: getIsFetchingSuccess(state),
  }
}

export default compose(
  connect(mapStateToProps, {
    setTheme,
    savePhoto,
    saveProfileInfo,
    logOut,
    setIndex,
    receiveProfileInfo,
    clearProfileInfo,
  })
)(SettingsContainer)
