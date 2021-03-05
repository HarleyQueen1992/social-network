import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import {getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import Profile from './Profile';

class ProfileContainer extends React.Component  {
    componentDidMount() {
        let userid = this.props.match.params.userid;

        if (!userid) {
            userid = this.props.profileInfo.userId
        }
        this.props.getUserProfile(userid)
        this.props.getStatus(userid)
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    profileInfo: state.auth.profileInfo,
    userId: state.auth.userId
})

// let withRedirect = withAuthRedirecr(ProfileContainer)


// let WithUrlDataContainerComponent = withRouter(withRedirect)

// export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps,{getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirecr
)(ProfileContainer)