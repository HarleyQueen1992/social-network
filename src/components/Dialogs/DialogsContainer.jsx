import React from 'react'
import { connect} from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { sendMessageActionCreator } from '../../redux/DialogsReducer/dialogs-reducer';
import { getDialogsPage, getIsAuth, getFriendsInDialogs, getIsFatching} from '../../redux/DialogsReducer/dialogs-selectors';
import Dialogs from './Dialogs'
import {setFriendsInDialogs, getFriends, toggleIsFatching} from './../../redux/DialogsReducer/dialogs-reducer'
import Preloader from '../common/Preloader/Preloader';

class DialogsContainer extends React.Component {

    render() {
        return <>{this.props.isFatching ? <Preloader/> : <Dialogs {...this.props}/>}</>
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: getDialogsPage(state),
        isAuth: getIsAuth(state),
        friendsInDialogs: getFriendsInDialogs(state),
        isFatching: getIsFatching(state),
    }
}

export default compose(
    connect(mapStateToProps, {sendMessageActionCreator, setFriendsInDialogs, 
        toggleIsFatching,  getFriends}),
    withAuthRedirecr
)(DialogsContainer)
