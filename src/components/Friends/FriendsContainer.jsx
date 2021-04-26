import React from 'react';
import { connect } from 'react-redux';
import Friends from './Friends';
import {setFriends, toggleIsFatching, setCurrentPage, setFriendsTotalCount, nextPage, earlyPage, requestFriends} from '../../redux/FriendsReducer/friends-reducer'
import Preloader from '../common/Preloader/Preloader';
import { getCurrentPage, getFriends, getIsFatching, getPageSize, getTotalFriendsCount } from '../../redux/FriendsReducer/friends-selectors';

class FriendsContainer extends React.Component {

    componentDidMount() {
        if (this.props.isFatching) {
            this.props.requestFriends(this.props.currentPage)

        }
    }

    componentDidUpdate() {
        if (this.props.isFatching) {
            this.props.requestFriends(this.props.currentPage)

        }
    }
    // componentDidMount() {
    //     this.props.requestFriends(this.props.currentPage, this.props.pageSize)
    // }
    
    // onPageChenged = (pageNumber) => {
    //     this.props.requestFriends(pageNumber, this.props.pageSize)
    // }

    // earlyPageNumber = () => {
    //     this.props.requestFriends(this.props.currentPage - 1, this.props.pageSize, 'early')
    // }

    // increasePageNumber = () => {
    //     debugger
    //     this.props.requestFriends(this.props.currentPage + 1, this.props.pageSize, 'next')
    // }

    render() {
        return (<>
            
            <Friends friends={this.props.friends}
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
                       increasePageNumber={this.increasePageNumber}/>

        </>)
    }
    

}

let mapStateToProps = (state) => {
    return {
        friends: getFriends(state),
        isFatching: getIsFatching(state) ,
        pageSize: getPageSize(state),
        totalFriendsCount: getTotalFriendsCount(state),
        currentPage: getCurrentPage(state)

    }
}

export default connect(mapStateToProps, {setFriendsTotalCount, setFriends, setCurrentPage, 
                                         toggleIsFatching, nextPage, earlyPage, requestFriends})(FriendsContainer);