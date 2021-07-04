import React from "react"
import preloaderW from "./../../../assets/images/Spinner-2.1s-211px.svg"
import { getTheme } from "./../../../redux/AppReducer/app-selectors"
import PreloaderBlack from "./../../../assets/images/preloaderBlack.svg"
import PreloaderWhite from "./../../../assets/images/preloaderWhite.svg"
import s from "./Preloader.module.css"
import { connect } from "react-redux"
import { compose } from "redux"

const Preloader = props => {
  return (
    <div className={s.preloader}>
      <img
        alt='preloader'
        src={props.theme == "lightTheme" ? PreloaderBlack : PreloaderWhite}
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
