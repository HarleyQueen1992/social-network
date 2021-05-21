import React from "react"
import { addPostActionCreator } from "../../../../redux/PostsReducer/posts-reducer"
import {
  toggleIsPostCreation,
  toggleIsHeaderBlur,
} from "../../../../redux/AppReducer/app-reducer"
import { connect } from "react-redux"
import { compose } from "redux"
import {
  getHeaderBlur,
  getTheme,
} from "../../../../redux/AppReducer/app-selectors"
import PostCreation from "./PostCreation"

class PostCreationContainer extends React.Component {
  componentWillUnmount() {
    this.props.toggleIsHeaderBlur(false)
    console.log("asdasd")
  }
  render() {
    return (
      <>
        <PostCreation
          theme={this.props.theme}
          addPostActionCreator={this.props.addPostActionCreator}
          toggleIsPostCreation={this.props.toggleIsPostCreation}
          toggleIsHeaderBlur={this.props.toggleIsHeaderBlur}
          headerBlur={this.props.headerBlur}
        />
      </>
    )
  }
}
let mapStateToProps = state => {
  return {
    headerBlur: getHeaderBlur(state),
    theme: getTheme(state),
  }
}
export default compose(
  connect(mapStateToProps, {
    addPostActionCreator,
    toggleIsPostCreation,
    toggleIsHeaderBlur,
  })
)(PostCreationContainer)
