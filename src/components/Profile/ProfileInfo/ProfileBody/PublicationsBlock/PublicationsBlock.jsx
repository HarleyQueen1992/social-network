import React from "react";

//? Components
import FilterButton from "./../FilterButton/FilterButton";

//? Css
import s from "./PublicationsBlock.module.css";

const PublicationsBlock = (props) => {
  return (
    <div className={s.publicationsBlockAll}>
      <div className={s.publicationsTitleAndFilter}>
        <span className={s.publicationsTitle}>Publications</span>
        <FilterButton
          setIsOpenFilters={props.setIsOpenFilters}
          filterImg={props.res["filter"]}
        />
      </div>
      <div className={s.listBlock}>
        <img className={s.listImg} src={props.res["list"]} alt="list img" />
        <span className={s.listTitle}>List</span>
      </div>
    </div>
  );
};
export default PublicationsBlock;
