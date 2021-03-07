import React from 'react'
import { connect} from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { getIsAuth } from '../../redux/AuthReducer/auth-selectors';
import { sendMessageActionCreator } from '../../redux/DialogsReducer/dialogs-reducer';
import { getDialogsPage } from '../../redux/DialogsReducer/dialogs-selectors';
import Dialogs from './Dialogs'

class DialogsContainer extends React.Component {
    render() {
        return <Dialogs {...this.props}/>
    }

}

let mapStateToProps = (state) => {
    return {
        dialogsPage: getDialogsPage(state),
        isAuth: getIsAuth(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessages: (messageBody) => {
            dispatch(sendMessageActionCreator(messageBody));
        },
        // submitMessage: (text) => {
        //     dispatch(updateNewMessageTextActionCreator(text))
        // }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirecr
)(DialogsContainer)
