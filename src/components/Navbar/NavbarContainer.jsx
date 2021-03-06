import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
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
        friends: state.navbarPage.friends
    }
}

export default compose(
    connect(mapStateToProps,{})
)(NavbarContainer)