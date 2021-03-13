import React from 'react'
import { connect} from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { getIsAuth } from '../../redux/AuthReducer/auth-selectors';
import { sendMessageActionCreator } from '../../redux/DialogsReducer/dialogs-reducer';
import { getDialogsPage } from '../../redux/DialogsReducer/dialogs-selectors';
import Dialogs from './Dialogs'
import {getFriends, getIsFatching, getPageSize, getTotalFriendsCount, getCurrentPage } from './../../redux/FriendsReducer/friends-selectors'
import {setFriendsTotalCount, setFriends, setCurrentFriend, toggleIsFatching, nextFriend, earlyFriend, requestFriends} from './../../redux/DialogsReducer/dialogs-reducer'

class DialogsContainer extends React.Component {

    componentDidMount() {
        this.props.requestFriends(this.props.currentFriend, this.props.pageSize)
    }

    onPageChenged = (pageNumber) => {
        this.props.requestFriends(pageNumber, this.props.pageSize)
    }

    earlyFriendNumber = () => {
        this.props.requestFriends(this.props.currentFriend - 1, this.props.pageSize, 'early')
    }

    increaseFriendNumber = () => {
        this.props.requestFriends(this.props.currentFriend + 1, this.props.pageSize, 'next')
    }

    render() {
        return <Dialogs {...this.props}
                        onPageChenged={this.onPageChenged}
                        earlyFriendNumber={this.earlyFriendNumber}
                        increaseFriendNumber={this.increaseFriendNumber}/>
    }

}

let mapStateToProps = (state) => {
    return {
        dialogsPage: getDialogsPage(state),
        isAuth: state.dialogsPage.isAuth,
        friends: state.dialogsPage.friends,
        isFatching: state.dialogsPage.isFatching ,
        pageSize: state.dialogsPage.pageSize,
        totalFriendsCount: state.dialogsPage.totalFriendsCount,
        currentFriend: state.dialogsPage.currentFriend
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessages: (messageBody) => {
//             dispatch(sendMessageActionCreator(messageBody));
//         },
//         // submitMessage: (text) => {
//         //     dispatch(updateNewMessageTextActionCreator(text))
//         // }
//     }
// }

export default compose(
    connect(mapStateToProps, {sendMessageActionCreator, setFriendsTotalCount, setFriends, setCurrentFriend, 
        toggleIsFatching, nextFriend, earlyFriend, requestFriends}),
    withAuthRedirecr
)(DialogsContainer)
