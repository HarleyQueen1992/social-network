import React from 'react'
import { connect} from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirecr } from '../../Hoc/withAuthRedirect';
import { sendMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs'

class DialogsContainer extends React.Component {
    render() {
        return <Dialogs {...this.props}/>
    }

}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
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
