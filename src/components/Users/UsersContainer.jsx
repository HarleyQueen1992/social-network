import React from 'react';
import { connect } from 'react-redux';
import { getUsers, follow, setUsers,
          unfollow, toggleFollowingProgress } from '../../redux/user-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
class UsersC extends React.Component {
    
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    
    earlyPageNumber = () => {
        this.props.getUsers(this.props.currentPage - 1, this.props.pageSize, 'early')
    }

    increasePageNumber = () => {
        this.props.getUsers(this.props.currentPage + 1, this.props.pageSize, 'next')
    }

    onPageChenged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        isFatching: state.usersPage.isFatching,
        followingInProgress: state.usersPage.followingInProgress


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
            toggleFollowingProgress, getUsers
        }),
    withAuthRedirecr
)(UsersC)