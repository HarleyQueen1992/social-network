import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getPanelFriends } from '../../redux/NavbarReducer/navbar-selectors'
import Navbar from './Navbar'

class NavbarContainer extends React.Component {
    render() {
        return (
            <Navbar friends={this.props.friends}/>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        friends: getPanelFriends(state)
    }
}

export default compose(
    connect(mapStateToProps,{})
)(NavbarContainer)