import React from 'react'
import { connect} from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { sendMessageActionCreator } from '../../redux/DialogsReducer/dialogs-reducer';
import { getDialogsPage } from '../../redux/DialogsReducer/dialogs-selectors';
import Dialogs from './Dialogs'
import {setFriendsInDialogs, getFriends, toggleIsFatching} from './../../redux/DialogsReducer/dialogs-reducer'
import Preloader from '../common/Preloader/Preloader';

class DialogsContainer extends React.Component {

        componentDidMount() {
            this.props.getFriends()
        }


    render() {
        return <>{this.props.isFatching ? <Preloader/> : <Dialogs {...this.props}/>}</>
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: getDialogsPage(state),
        isAuth: state.dialogsPage.isAuth,
        friendsInDialogs: state.dialogsPage.friendsInDialogs,
        isFatching: state.dialogsPage.isFatching,
    }
}

export default compose(
    connect(mapStateToProps, {sendMessageActionCreator, setFriendsInDialogs, 
        toggleIsFatching,  getFriends}),
    withAuthRedirecr
)(DialogsContainer)
