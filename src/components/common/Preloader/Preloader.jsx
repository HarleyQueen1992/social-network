import React from "react"
import preloaderW from "./../../../assets/images/Spinner-2.1s-211px.svg"
import { getTheme } from "./../../../redux/AppReducer/app-selectors"
import preloader from "./../../../assets/images/Preloader.svg"
import s from "./Preloader.module.css"
import { connect } from "react-redux"
import { compose } from "redux"

const Preloader = props => {
  return (
    <div className={s.preloader}>
      <img
        alt='preloader'
        src={props.theme == "lightTheme" ? preloader : preloaderW}
      />
    </div>
  )
}

let mapStateToProps = state => {
  return {
    theme: getTheme(state),
  }
}
export default compose(connect(mapStateToProps, {}))(Preloader)
