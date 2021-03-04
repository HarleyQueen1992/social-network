import React from 'react';
import h from './Header.module.css'
import {NavLink} from 'react-router-dom'
import photo from '../../assets/images/user.png'
import Preloader from '../common/Preloader/Preloader';

const Header = (props) => {
    return <header className={h.header}>
        <div className={h.logoBlock} >
            <img width='100px' className={h.logo} src='https://png.pngtree.com/png-vector/20200908/ourlarge/pngtree-pug-dog-smoke-pipe-illustration-png-image_2341735.jpg' />
            <span className={h.headerName}>Mosset</span>
        </div>
        <div className={h.loginBlock}>  
            {props.isAuth ?
                props.profileInfo === null ? <Preloader/> :
                    <div>{props.profileInfo.photos.large === null || undefined ?
                        <div className={h.avaLogin} >
                            <img className={h.ava} src={photo} />
                            <span className={h.userName} >{props.profileInfo.fullName}</span>
                            {/* <img onClick={props.logOut} className={h.logout} src="https://image.flaticon.com/icons/png/512/25/25706.png" />   */}
                            <button className={h.logout} onClick={props.logOut} >Log Out</button>  
                        </div> :
                        <div className={h.avaLogin} >  
                            <img className={h.ava} src={props.profileInfo.photos.large}/>
                            <span className={h.userName} >{props.profileInfo.fullName}</span>
                            {/* <img onClick={props.logOut} className={h.logout} src="https://image.flaticon.com/icons/png/512/25/25706.png"/> */}
                            <button className={h.logout} onClick={props.logOut} >Log Out</button>  
                        </div>}
                    </div> 
            : <NavLink to={'/login'} className={h.authBlock}>Login</NavLink>}
        </div>
              
     
    </header>
}

export default Header;
