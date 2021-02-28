import React from 'react';
import { connect } from 'react-redux';
import Friends from './Friends';
import {setFriends, toggleIsFatching, setCurrentPage, setFriendsTotalCount, nextPage, earlyPage, getFriends} from '../../redux/friends-reducer'
import Preloader from '../common/Preloader/Preloader';

class FriendsContainer extends React.Component {

    componentDidMount() {
        this.props.getFriends(this.props.currentPage, this.props.pageSize)
    }

    onPageChenged = (pageNumber) => {
        this.props.getFriends(pageNumber, this.props.pageSize)
    }

    earlyPageNumber = () => {
        this.props.getFriends(this.props.currentPage - 1, this.props.pageSize, 'early')
    }

    increasePageNumber = () => {
        this.props.getFriends(this.props.currentPage + 1, this.props.pageSize, 'next')
    }

    render() {
        return (<>
            { this.props.isFatching
            ? <Preloader/> 
            : <Friends friends={this.props.friends}
                       isFatching={this.props.isFatching}
                       pageSize={this.props.pageSize}
                       totalFriendsCount={this.props.totalFriendsCount}
                       currentPage={this.props.currentPage}
                       setFriendsTotalCount={this.props.setFriendsTotalCount}
                       setFriends={this.props.setFriends}
                       setCurrentPage={this.props.setCurrentPage}
                       toggleIsFatching={this.props.toggleIsFatching}
                       onPageChenged={this.onPageChenged}
                       earlyPageNumber={this.earlyPageNumber}
                       increasePageNumber={this.increasePageNumber}/>}

        </>)
    }
    

}

let mapStateToProps = (state) => {
    return {
        friends: state.friendsPage.friends,
        isFatching: state.friendsPage.isFatching,
        pageSize: state.friendsPage.pageSize,
        totalFriendsCount: state.friendsPage.totalFriendsCount,
        currentPage: state.friendsPage.currentPage

    }
}

export default connect(mapStateToProps, {setFriendsTotalCount, setFriends, setCurrentPage, 
                                         toggleIsFatching, nextPage, earlyPage, getFriends})(FriendsContainer);