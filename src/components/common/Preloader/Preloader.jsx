import React from 'react'
import preloader from './../../../assets/images/Preloader.svg'
import s from './Preloader.module.css'

const Preloader = (props) => {
    return <div className={s.preloader} >
        <img src={preloader} />
    </div>
}

export default Preloader;