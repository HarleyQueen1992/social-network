import React from 'react';
import { connect } from 'react-redux';
import { authAPI } from '../../API/api.js';
import { setAuthUserData, setProfileData, getAuthMe, logOut } from '../../redux/auth-reducer.js';
import Header from './Header.jsx'

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getAuthMe()
        // authAPI.loginIn('3oiabe1r.isv@kjjit.eu', 'gaverla')
    }

    // componentDidUpdate(prevProps, prevState) {
    //     debugger
    //     if (this.props.profileInfo !== prevProps.profileInfo) {
    //         this.props.getAuthMe()
    //     }
    // }

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

export default connect(mapStateToProps,{setAuthUserData, setProfileData, getAuthMe, logOut})(HeaderContainer);
