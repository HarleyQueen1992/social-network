import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getFriends } from "../../redux/NavbarReducer/navbar-reducer";
import { getPanelFriends } from "../../redux/NavbarReducer/navbar-selectors";
import Preloader from "../common/Preloader/Preloader";
import Navbar from "./Navbar";

class NavbarContainer extends React.Component {
  render() {
    return (
      <>
        {this.props.friendsBlock === null ? (
          <Preloader />
        ) : (
          <Navbar friends={this.props.friendsBlock} />
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    friendsBlock: getPanelFriends(state),
  };
};

export default compose(connect(mapStateToProps, {}))(NavbarContainer);
