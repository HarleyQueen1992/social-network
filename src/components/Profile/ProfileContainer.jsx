import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import {getUserProfile, requestStatus,toggleIsFatching, setUserProfile, setStatus, toggleIsFollow, updateStatus, deletePost, savePhoto, getFollow } from '../../redux/ProfileReducer/profile-reducer';
import { getIsFatching, getIsFollow, getProfile, getStatus } from '../../redux/ProfileReducer/profile-selectors';
import Profile from './Profile';
import {getIsAuth, getProfileInfo, getUserId } from '../../redux/AuthReducer/auth-selectors'
import Preloader from '../common/Preloader/Preloader'
import { follow, unfollow } from '../../redux/UsersReducer/user-reducer';

class ProfileContainer extends React.Component  {

    refreshProfile() {
        let userid = this.props.match.params.userid;

        if (!userid) {
            userid = this.props.profileInfo.userId
            this.props.getUserProfile(userid)
            // this.props.requestStatus(userid)
        } else {
            this.props.getUserProfile(userid)
            // this.props.requestStatus(userid)
            this.props.getFollow(userid)
        }

    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userid !== prevProps.match.params.userid) {
            this.refreshProfile()
        }
    }
    componentWillUnmount() {
        this.props.toggleIsFollow(null)
        this.props.setUserProfile(null)
        this.props.setStatus(null)
    }
    render() {
        return (
            <>{ this.props.isFatching ? <Preloader/>   :
                <Profile {...this.props}
                        isOwner={!this.props.match.params.userid} 
                        profile={this.props.profile} 
                        status={this.props.status} 
                        updateStatus={this.props.updateStatus}
                        deletePost={this.props.deletePost}
                        savePhoto={this.props.savePhoto}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        isFollow={this.props.isFollow} />}
            
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    profile: getProfile(state),
    isAuth: getIsAuth(state),
    isFatching: getIsFatching(state),
    status: getStatus(state),
    profileInfo: getProfileInfo(state),
    userId: getUserId(state),
    isFollow: getIsFollow(state)
})

// let withRedirect = withAuthRedirecr(ProfileContainer)


// let WithUrlDataContainerComponent = withRouter(withRedirect)

// export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps,{getUserProfile, updateStatus, 
                            deletePost, savePhoto, follow, getFollow,
                            unfollow, toggleIsFollow, toggleIsFatching, setUserProfile, setStatus}),
    withRouter,
    withAuthRedirecr
)(ProfileContainer)
