import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirecr } from "../../Hoc/withAuthRedirect";
import s from "./PageNotFound.module.css";

const PageNotFound = (props) => {
  return (
    <div className={s.pageNotFound}>
      <h2>Page Not Found</h2>
      <h1>404</h1>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {};
};

export default compose(
  connect(mapStateToProps, {}),
  withAuthRedirecr
)(PageNotFound);
