import React, {useState, useEffect } from 'react';
import s from './Settings.module.css'
import Sun from './../../assets/images/sun.png'
import Moon from './../../assets/images/moon.png'

const Settings = (props) => {

    useEffect( () => {
        for (let property in props.theme) {
            document.documentElement.style.setProperty('--' + property, props.theme[property]);

        }
    }, [props.theme])

    // changeTheme = (e) => {
    //     props.setTheme({color: event.target.value});
        
    // }
    const themeToggler = () => {
        props.theme == 'lightTheme' ? props.setTheme("dark") : props.setTheme("light");
      };

    return (
        <div className={s.container} >
            <input onClick={ () => {themeToggler()}} type='checkbox' className={s.checkbox} id="chk" />
            <label className={s.label} for="chk">
                <img className={s.img} src={Moon} />
                <img className={s.img} src={Sun} />
                <div className={s.ball + " " + (props.theme == 'lightTheme' ? s.active : "")}></div>
            </label>
        </div>
    );
}

export default Settings;