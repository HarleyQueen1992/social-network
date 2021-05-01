import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getTheme } from '../../redux/AppReducer/app-selectors'
import Services from './Services'

class ServicesContainer extends React.Component {

    render() {
        return ( <>
                     <Services theme={this.props.theme}/>
                </>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        theme: getTheme(state)
    }
}

export default compose(
    connect(mapStateToProps,{})
)(ServicesContainer)