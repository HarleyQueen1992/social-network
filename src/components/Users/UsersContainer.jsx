import React from 'react';
import { connect } from 'react-redux';
import { requestUsers, follow, setUsers,
          unfollow, toggleFollowingProgress } from '../../redux/UsersReducer/user-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getCurrentPage, getPageSize, getTotalUsersCount, getIsFatching, getFollowingInProgress } from '../../redux/UsersReducer/users-selectors';
class UsersC extends React.Component {
    
    componentDidMount() {
        debugger
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }
    
    earlyPageNumber = () => {
        this.props.requestUsers(this.props.currentPage - 1, this.props.pageSize, 'early')
    }

    increasePageNumber = () => {
        this.props.requestUsers(this.props.currentPage + 1, this.props.pageSize, 'next')
    }

    onPageChenged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }
    render() {
        return <> 
            { this.props.isFatching ? <Preloader/> : 
            <Users totalUsersCount={this.props.totalUsersCount}
                      currentPage={this.props.currentPage}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      onPageChenged={this.onPageChenged}
                      increasePageNumber={this.increasePageNumber}
                      earlyPageNumber={this.earlyPageNumber}
                      followingInProgress={this.props.followingInProgress}
                      toggleFollowingProgress={this.props.toggleFollowingProgress}/>}
                </>
    }
    
}

let mapStateToProps = (state) => {
    console.log("mapStateToProps")
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        isFatching: getIsFatching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// let withRedirect = withAuthRedirecr(UsersC)

// export default connect(mapStateToProps, 
//     {
//         follow, unfollow, setUsers,
//         toggleFollowingProgress, getUsers
//     }) (withRedirect);

export default compose(
    connect(mapStateToProps, 
        {
            follow, unfollow, setUsers,
            toggleFollowingProgress, requestUsers
        }),
    withAuthRedirecr
)(UsersC)

