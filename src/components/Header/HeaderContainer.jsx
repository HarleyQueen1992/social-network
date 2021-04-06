import React from 'react';
import { connect } from 'react-redux';
import { authAPI } from '../../API/api.js';
import { setAuthUserData, setProfileData, getAuthMe, logOut } from '../../redux/AuthReducer/auth-reducer.js';
import {getValue, getUsersSearch, getWindowMode} from '../../redux/UsersReducer/users-selectors'
import {requestForUsers, setValue, clearValue, setWindowMode} from '../../redux/UsersReducer/user-reducer'
import { getIsAuth, getProfileInfo, getLogin } from '../../redux/AuthReducer/auth-selectors.js';
import Header from './Header.jsx'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class HeaderContainer extends React.Component {

    // componentDidMount() {
    //     this.props.getAuthMe()
    // }


    handleChange = (event) => {
        this.props.setValue(event.target.value)
        this.props.requestForUsers(event.target.value)
    }

    render() {
        return (
            <Header {...this.props} windowMode={this.props.windowMode} setWindowMode={this.props.setWindowMode} clear={this.props.clearValue} usersSearch={this.props.usersSearch} handleChange={this.handleChange} value={this.props.value}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        login: getLogin(state),
        isAuth: getIsAuth(state),
        profileInfo: getProfileInfo(state),
        value: getValue(state),
        usersSearch: getUsersSearch(state),
        windowMode: getWindowMode(state)
    }
}

export default compose(
    connect(mapStateToProps,{setWindowMode, setAuthUserData, setProfileData, getAuthMe, logOut, requestForUsers, setValue, clearValue}),
    withRouter
)(HeaderContainer)
