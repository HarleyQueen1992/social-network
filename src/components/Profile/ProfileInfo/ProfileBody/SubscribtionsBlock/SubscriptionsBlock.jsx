import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose } from "redux";

// Selectors imports
import { getTheme } from "../../../../../redux/AppReducer/app-selectors";
import {
  getProfile,
  getSubscribers,
  getSubscriptions,
  getTotalSubscribersItems,
  getTotalSubscriptionsItems,
} from "../../../../../redux/ProfileReducer/profile-selectors";

// Utils
import { Icons } from "./../../../../../utils/Icons/Icons";

// Css
import s from "./SubscriptionsBlock.module.css";

const SubscriptionsBlock = (props) => {
  let res = Icons(props.theme);
  let subscriptions =
    props.block === "subscribers" ? props.subscribers : props.subscriptions;
  return (
    <div
      className={
        s.subscriptionSubscribersBlock +
        " " +
        (subscriptions.length == 0 ? s.subscriptionSubscribersBlockEmpty : " ")
      }
    >
      <div className={s.subscriptionSubscribersTitle}>
        {props.block === "subscriptions" ? (
          <NavLink to={"/followings/" + props.profile.login}>
            Subscribptions {props.totalSubscriptionsItems}
          </NavLink>
        ) : (
          <NavLink to={"/followers/" + props.profile.login}>
            Subscribers {props.totalSubscribersItems}
          </NavLink>
        )}
      </div>
      <div
        className={
          s.subscriptionSubscribersList +
          " " +
          (subscriptions.length == 0 ? s.subscriptionSubscribersListNone : "")
        }
      >
        {subscriptions.map((f) => (
          <NavLink
            to={"/profile/" + f.login}
            className={s.subscriptionSubscribersListItem}
            key={f.id}
          >
            <div className={s.subscriptionSubscribersBlockImg}>
              <img
                className={s.subscriptionSubscribersImg}
                src={f.avatar ? f.avatar : res["defaultAvatr"]}
                alt="user photo"
              />
            </div>
            <div className={s.subscriptionSubscribersName}>{f.login}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    theme: getTheme(state),
    subscriptions: getSubscriptions(state),
    subscribers: getSubscribers(state),
    profile: getProfile(state),
    totalSubscriptionsItems: getTotalSubscriptionsItems(state),
    totalSubscribersItems: getTotalSubscribersItems(state),
  };
};
export default compose(connect(mapStateToProps, {}))(SubscriptionsBlock);
