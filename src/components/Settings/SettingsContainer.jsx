import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {setTheme} from './../../redux/AppReducer/app-reducer'
import { getTheme } from '../../redux/AppReducer/app-selectors'
import Settings from './Settings'

class SettingsContainer extends React.Component {

    render() {
        return ( <>
                     <Settings theme={this.props.theme}
                                setTheme={this.props.setTheme} />
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
    connect(mapStateToProps,{setTheme})
)(SettingsContainer)