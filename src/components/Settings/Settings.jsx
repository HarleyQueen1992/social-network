import React, { useEffect, useState } from "react"
import s from "./Settings.module.css"
import Sun from "./../../assets/images/sun.png"
import Moon from "./../../assets/images/moon.png"
import SettingsImg from "./../../assets/images/settings3.png"
import ProfileDataFormReduxForm from "./../Profile/ProfileInfo/ProfileDataForm/ProfileDataForm"
import PreloaderW from "./../../assets/images/Rolling-0.9s-31pxW.svg"
import Preloader from "./../../assets/images/Rolling-0.9s-31px.svg"
import Back from './../../assets/images/backW.png'
import Save from "./../../assets/images/save.png"
import Savew from "./../../assets/images/saveWa.png"
import ChangePasswordForm from "./ChangePassword/ChangePassword"
import SwipeableViews from 'react-swipeable-views';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink, HashRouter } from "react-router-dom"

const Settings = props => {
  let [errorRR, setError] = useState(false)

  let [index, setIndex] = useState(0)

  const handleChange = (event, value) => {
    setIndex(value)
  }
  const handleChangeIndex = index => {
    setIndex(index)
  }

  useEffect(() => {
    for (let property in props.theme) {
      document.documentElement.style.setProperty(
        "--" + property,
        props.theme[property]
      )
    }
  }, [props.theme])

  const themeToggler = () => {
    props.theme == "lightTheme"
      ? props.setTheme("dark")
      : props.setTheme("light")
  }

  const onMainPhotoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  const onSubmit = formData => {
    props.saveProfileInfo(formData).then(() => {})
  }
  const onSubmitPassword = formData => {
    if (formData.passwordNew != formData.passwordRepeat) {
      setError(true)
    } else {
      setError(false)
    }
    // props.saveProfileInfo(formData).then(() => {})
  }
  return (
    <div className={s.settingsBlock}>
      <header className={s.header}>
      <NavLink className={s.back} onClick={() => {props.setIndex(5)}} to='/menu'>
        <img alt='back' className={s.settingsImg} src={Back} />
      </NavLink>
        <div className={s.title}>Settings</div>
        {props.isFetchingSuccess ? (
          <img
            className={s.preloader}
            src={props.theme == "lightTheme" ? Preloader : PreloaderW}
            alt='preloader'
          />
        ) : (
          <img
            className={s.preloader}
            src={props.theme == "lightTheme" ? Save : Savew}
            alt='save'
          />
        )}
      </header>
      <Tabs value={index} className={s.tabs} onChange={handleChange}>
          <Tab className={s.tab} label="Themes" />
          <Tab className={s.tab} label="Profile" />
          <Tab className={s.tab} label="Password" />
      </Tabs>
        <SwipeableViews
          index={index}
          enableMouseEvents
          onChangeIndex={handleChangeIndex}
        >
          <div>
            <div className={s.generalBlock}>
            <div className={s.generalSettings}>
              <div className={s.themes}>
                <span className={s.themesTitle}>Theme:</span>
                <input
                  onClick={() => {
                    themeToggler()
                  }}
                  type='checkbox'
                  className={s.checkbox}
                  id='chk'
                />
                <label className={s.label} htmlFor='chk'>
                  <img className={s.img} alt='moon' src={Moon} />
                  <img className={s.img} alt='sun' src={Sun} />
                  <div
                    className={
                      s.ball + " " + (props.theme == "lightTheme" ? s.active : "")
                    }
                  ></div>
                </label>
              </div>
            </div>
            
          </div>
          </div>
          <div>
            <div className={s.profileBlock}>
            <div className={s.profileSettings}>
              <div className={s.changeAva}>
                <span className={s.changeTitle}>Change avatar:</span>
                <input
                  onChange={onMainPhotoSelected}
                  type='file'
                  id='input__file'
                />
                <label className={s.changeLabel} htmlFor='input__file'>
                  <span></span>
                </label>
              </div>

              <ProfileDataFormReduxForm
                initialValues={props.profile}
                onSubmit={onSubmit}
                profile={props.profile}
                Save={props.Save}
                theme={props.theme}
              />
              <div className={s.logOut}>
                <button className={s.btnLogOut} onClick={props.logOut}>
                  LogOut
                </button>
              </div>
            </div>
          </div>
          </div>
          <ChangePasswordForm
                errorRR={errorRR}
                onSubmit={onSubmitPassword}
              />
        </SwipeableViews>
      
      <div className={s.settings}>
        
      </div>
    </div>
  )
}

export default Settings
