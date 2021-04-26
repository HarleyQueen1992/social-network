import React from 'react';
import { connect } from 'react-redux';
import { requestUsers, follow, setUsers,
        unfollow, toggleIsFatching, toggleFollowingProgress} from '../../redux/UsersReducer/user-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getCurrentPage, getPageSize,  getTotalUsersCount, getIsFatching, getFollowingInProgress } from '../../redux/UsersReducer/users-selectors';
class UsersC extends React.Component {
    componentDidMount() {
        if (this.props.isFatching) {
            this.props.requestUsers(this.props.currentPage)

        }
    }

    componentDidUpdate() {
        if (this.props.isFatching) {
            this.props.requestUsers(this.props.currentPage)

        }
        // document.addEventListener('scroll', this.scrollHandler)
        // return function () {
        //     document.removeEventListener('scroll', this.scrollHandler)
        // }

    }
    // scrollHandler = (e) => {
    //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) == 0 && this.props.users.length < this.props.totalUsersCount) {
    //         debugger
    //         this.props.toggleIsFatching(true)
    //     } 
    // }
    // componentDidMount() {
    //     this.props.requestUsers(this.props.currentPage, this.props.pageSize)
        
    // } 
    
    // earlyPageNumber = () => {
    //     this.props.requestUsers(this.props.currentPage - 1, this.props.pageSize, 'early')
    // }

    // increasePageNumber = () => {
    //     this.props.requestUsers(this.props.currentPage + 1, this.props.pageSize, 'next')
    // }

    // onPageChenged = (pageNumber) => {
    //     this.props.requestUsers(pageNumber, this.props.pageSize)
    // }
    // onChenge = (term) => {
    //     this.props.setUserSearch(term)
    // }
    render() {
        return <> 
            
            <Users totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onPageChenged={this.onPageChenged}
                increasePageNumber={this.increasePageNumber}
                earlyPageNumber={this.earlyPageNumber}
                toggleIsFatching={this.props.toggleIsFatching}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                scrollHandler={this.props.scrollHandler}/>
                </>
    
    }
}

let mapStateToProps = (state) => {
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
            toggleFollowingProgress, requestUsers, toggleIsFatching
        }),
    withAuthRedirecr
)(UsersC)

