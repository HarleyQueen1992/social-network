import React, { useEffect, useState } from "react"
import s from "./Settings.module.css"
import Sun from "./../../assets/images/sun.png"
import Moon from "./../../assets/images/moon.png"
import SettingsImg from "./../../assets/images/settings3.png"
import More from "./../../assets/images/more.png"
import ProfileDataFormReduxForm from "./../Profile/ProfileInfo/ProfileDataForm/ProfileDataForm"
// import Preloader from "../common/Preloader/Preloader"
import PreloaderW from "./../../assets/images/Rolling-0.9s-31pxW.svg"
import Preloader from "./../../assets/images/Rolling-0.9s-31px.svg"
import SaveG from "./../../assets/images/saveG.png"
import ChangePasswordForm from "./ChangePassword/ChangePassword"

const Settings = props => {
  let [errorRR, setError] = useState(false)

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
        <img alt='SettingsImg' className={s.settingsImg} src={SettingsImg} />
        <div className={s.title}>Settings</div>
        {props.isFetchingSuccess ? (
          <img
            className={s.preloader}
            src={props.theme == "lightTheme" ? Preloader : PreloaderW}
            alt='preloader'
          />
        ) : (
          <img className={s.preloader} src={SaveG} alt='save' />
        )}
      </header>

      <div className={s.settings}>
        <div className={s.generalBlock}>
          <div className={s.settingsTitle}>General:</div>
          <div className={s.generalSettings}>
            <div className={s.themes}>
              <span className={s.themesTitle}>themes:</span>
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
          <div className={s.profileBlock}>
            <div className={s.settingsTitle}>ProfileSettings:</div>
            <div className={s.profileSettings}>
              <div className={s.changeAva}>
                <span className={s.changeTitle}>change ava:</span>
                <input
                  onChange={onMainPhotoSelected}
                  type='file'
                  id='input__file'
                />
                <label className={s.changeLabel} htmlFor='input__file'></label>
              </div>

              <ProfileDataFormReduxForm
                initialValues={props.profile}
                onSubmit={onSubmit}
                profile={props.profile}
                Save={props.Save}
                theme={props.theme}
              />

              <ChangePasswordForm
                errorRR={errorRR}
                onSubmit={onSubmitPassword}
              />
              <div className={s.logOut}>
                <button className={s.btnLogOut} onClick={props.logOut}>
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
