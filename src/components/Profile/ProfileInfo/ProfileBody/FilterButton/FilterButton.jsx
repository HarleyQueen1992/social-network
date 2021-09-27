import React from "react";

//? Css
import s from "./FilterButton.module.css";

const FilterButton = (props) => {
  return (
    <div
      className={s.publicationsFilter}
      onClick={() => {
        document.querySelector("body").style.cssText = "overflow: hidden;";
        props.setIsOpenFilters(true);
      }}
    >
      <img
        className={s.publicationsFilterImg}
        src={props.filterImg}
        alt="filter"
      />
      <span className={s.publicationsFilterTitle}>Filters</span>
    </div>
  );
};
export default FilterButton;
