import React, { useState, useEffect } from "react"
import s from "./Settings.module.css"
import Sun from "./../../assets/images/sun.png"
import Moon from "./../../assets/images/moon.png"
import SettingsImg from "./../../assets/images/settings3.png"
import More from "./../../assets/images/more.png"

const Settings = props => {
  useEffect(() => {
    for (let property in props.theme) {
      document.documentElement.style.setProperty(
        "--" + property,
        props.theme[property]
      )
    }
  }, [props.theme])

  // changeTheme = (e) => {
  //     props.setTheme({color: event.target.value});

  // }
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
  return (
    <div className={s.settingsBlock}>
      <header className={s.header}>
        <img className={s.settingsImg} src={SettingsImg} />
        <div className={s.title}>Settings</div>
      </header>
      <div className={s.settings}>
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
          <label className={s.label} for='chk'>
            <img className={s.img} src={Moon} />
            <img className={s.img} src={Sun} />
            <div
              className={
                s.ball + " " + (props.theme == "lightTheme" ? s.active : "")
              }
            ></div>
          </label>
        </div>
        <div className={s.changeAva}>
          <span className={s.changeTitle}>change ava:</span>
          <input onChange={onMainPhotoSelected} type='file' id='input__file' />
          <label className={s.changeLabel} for='input__file'>
            <img className={s.moreImg} src={More} />
          </label>
        </div>
      </div>
    </div>
  )
}

export default Settings
