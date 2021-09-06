import React, { useState } from "react";
import s from "./Filters.module.css";
import { setIsOpenFilters } from "./../../../../redux/ProfileReducer/profile-reducer";
import { setOrdering } from "./../../../../redux/PostsReducer/posts-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { getOrdering } from "../../../../redux/PostsReducer/posts-selectors";

export const Filters = (props) => {
  let [oredering, setOrdering] = useState(props.ordering);
  let ready = () => {
    props.setIsOpenFilters(false);
    props.setOrdering(oredering);
    document.querySelector("body").style.cssText = "overflow: scroll;";
  };
  //   likes, -likes, createdAt, -createdAt
  return (
    <div
      className={s.popupFilters}
      onClick={() => {
        document.querySelector("body").style.cssText = "overflow: scroll;";
        props.setIsOpenFilters(false);
      }}
    >
      <div
        className={s.popupFiltersBlock}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className={s.header}>
          <spna className={s.title}>Post filters</spna>
          <div
            className={s.popupContentHeaderOff}
            onClick={() => {
              document.querySelector("body").style.cssText =
                "overflow: scroll;";
              props.setIsOpenFilters(false);
            }}
          ></div>
        </header>
        <div className={s.popupFiltersContent}>
          <div className={s.filtersField}>
            <div className={s.filtersFieldTitle}>
              By date from newest to oldest
            </div>
            <input
              type="checkbox"
              className={s.customCheckbox}
              id="-createdAt"
              name="-createdAt"
              onClick={(e) => {
                setOrdering(e.target.name);
              }}
            />
            <label
              className={
                oredering == "-createdAt" ? s.customCheckboxActive : ""
              }
              for="-createdAt"
            ></label>
          </div>
          <div className={s.filtersField}>
            <div className={s.filtersFieldTitle}>
              By date from oldest to newest
            </div>
            <input
              type="checkbox"
              className={s.customCheckbox}
              id="createdAt"
              name="createdAt"
              onClick={(e) => {
                setOrdering(e.target.name);
              }}
            />
            <label
              className={oredering == "createdAt" ? s.customCheckboxActive : ""}
              for="createdAt"
            ></label>
          </div>
          <div className={s.filtersField}>
            <div className={s.filtersFieldTitle}>
              By likes from large to smallest
            </div>
            <input
              type="checkbox"
              className={s.customCheckbox}
              id="likes"
              name="likes"
              onClick={(e) => {
                setOrdering(e.target.name);
              }}
            />
            <label
              className={oredering == "likes" ? s.customCheckboxActive : ""}
              for="likes"
            ></label>
          </div>
          <div className={s.filtersField}>
            <div className={s.filtersFieldTitle}>
              By likes from lowest to highest
            </div>
            <input
              type="checkbox"
              className={s.customCheckbox}
              id="-likes"
              name="-likes"
              onClick={(e) => {
                setOrdering(e.target.name);
              }}
            />
            <label
              className={oredering == "-likes" ? s.customCheckboxActive : ""}
              for="-likes"
            ></label>
          </div>
        </div>
        <div className={s.popupFiltersButtons}>
          <div></div>
          <div className={s.buttonsReady} onClick={ready}>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  ordering: getOrdering(state),
});

export default compose(
  connect(mapStateToProps, {
    setIsOpenFilters,
    setOrdering,
  })
)(Filters);
