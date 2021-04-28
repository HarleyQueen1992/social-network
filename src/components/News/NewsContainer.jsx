import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getPosts } from '../../redux/PostsReducer/posts-selectors'
import Preloader from '../common/Preloader/Preloader'
import News from './News'

class NewsContainer extends React.Component {
    render() {
        return ( <>
                    <News posts={this.props.posts}/>
                </>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: getPosts(state)
    }
}

export default compose(
    connect(mapStateToProps,{})
)(NewsContainer)