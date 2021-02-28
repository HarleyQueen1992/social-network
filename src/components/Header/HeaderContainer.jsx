import React from 'react';
import { connect } from 'react-redux';
import { setAuthUserData, setProfileData, getAuthMe } from '../../redux/auth-reducer.js';
import Header from './Header.jsx'

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getAuthMe()
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        profileInfo: state.auth.profileInfo
    }
}

export default connect(mapStateToProps,{setAuthUserData, setProfileData, getAuthMe})(HeaderContainer);
