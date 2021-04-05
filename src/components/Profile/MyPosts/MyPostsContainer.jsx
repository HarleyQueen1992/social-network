import React from 'react';
import {addPostActionCreator, addLike, deletePost} from '../../../redux/ProfileReducer/profile-reducer';
import {getNewPostText, getPosts, getProfile, getIsFatching} from '../../../redux/ProfileReducer/profile-selectors'
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { getLogin } from '../../../redux/AuthReducer/auth-selectors';
import { compose } from 'redux';
import Preloader from '../../common/Preloader/Preloader';


class MyPostsContainer extends React.Component  {
    render() {
        return(<>
            { this.props.profile === null
                ? <Preloader/> 
                : <MyPosts
                deletePost={this.props.deletePost}
                addPostActionCreator={this.props.addPostActionCreator}
                addLike={this.props.addLike}
                posts={this.props.posts}
                newPostText={this.props.newPostText}
                login={this.props.login}
                profile={this.props.profile}



                />}
        </>
        )
    }

}
let mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        newPostText: getNewPostText(state),
        login: getLogin(state),
        profile: getProfile(state),
        isFatching: getIsFatching(state)

    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPostText: (newPostText) => {
//             dispatch(addPostActionCreator(newPostText))
//         },
//         addLike: (postId) => {
//             dispatch(addLike(postId))
//         },
//         deletePost: (postId) => {
//             dispatch(deletePost(postId))
//         }
//     }
// }
export default compose(
    connect(mapStateToProps,{deletePost, addLike, addPostActionCreator})
)(MyPostsContainer)
