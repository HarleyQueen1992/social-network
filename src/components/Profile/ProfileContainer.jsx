import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import {getUserProfile, requestStatus, updateStatus, deletePost, savePhoto } from '../../redux/ProfileReducer/profile-reducer';
import { getProfile, getStatus } from '../../redux/ProfileReducer/profile-selectors';
import Profile from './Profile';
import {getIsAuth, getProfileInfo, getUserId } from '../../redux/AuthReducer/auth-selectors'

class ProfileContainer extends React.Component  {

    refreshProfile() {
        let userid = this.props.match.params.userid;

        if (!userid) {
            userid = this.props.profileInfo.userId
        }
        this.props.getUserProfile(userid)
        this.props.requestStatus(userid)
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userid !== prevProps.match.params.userid) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <>
                <Profile {...this.props}
                        isOwner={!this.props.match.params.userid} 
                        profile={this.props.profile} 
                        status={this.props.status} 
                        updateStatus={this.props.updateStatus}
                        deletePost={this.props.deletePost}
                        savePhoto={this.props.savePhoto} />
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    profile: getProfile(state),
    isAuth: getIsAuth(state),
    status: getStatus(state),
    profileInfo: getProfileInfo(state),
    userId: getUserId(state)
})

// let withRedirect = withAuthRedirecr(ProfileContainer)


// let WithUrlDataContainerComponent = withRouter(withRedirect)

// export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps,{getUserProfile, requestStatus, updateStatus, deletePost, savePhoto}),
    withRouter,
    withAuthRedirecr
)(ProfileContainer)