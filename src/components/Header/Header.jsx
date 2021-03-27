import React from 'react';
import h from './Header.module.css'
import {NavLink} from 'react-router-dom'
import photo from '../../assets/images/user.png'
import Preloader from '../common/Preloader/Preloader';
import play from './../../assets/images/playAudioPleer.png'
import next from './../../assets/images/next.png'
import previous from './../../assets/images/previous.png'

const Header = (props) => {

    // const handleChange = (event) => {
    //     props.setValue(event.target.value);
    //   }

    return <header className={h.header}>
        <div className={h.logoBlock} >
            <img width='100px' className={h.logo} src='https://png.pngtree.com/png-vector/20200908/ourlarge/pngtree-pug-dog-smoke-pipe-illustration-png-image_2341735.jpg' />
            <span className={h.headerName}> <NavLink to={'/profile/'} >Mosset</NavLink> </span>
        </div>
        <div className={h.searchBlock} >
            {/* <form> */}
                <input value={props.value} onBlur={() => {props.setWindowMode(false)}} onChange={props.handleChange} onClick={() => {props.setWindowMode(true)}} className={h.searchUsers} type="text" placeholder="Search.." />
            
            {/* </form> */}
            
        </div>
        <div className={h.audioPlaer} >
            <div className={h.controls} >
                <span className={h.previous} ><img src={previous}/> </span>
                <span className={h.playStop} ><img src={play} /></span>
                <span className={h.next} ><img src={next}/></span>
            </div>
            <div className={h.nameOfMusic} >
                Gorid Dorofeva
            </div>
            {/* <audio controls="controls" ></audio> */}
        </div>
        <div className={h.loginBlock}>  
            {props.isAuth ?
                props.profileInfo === null ? <Preloader/> :
                    <div>{props.profileInfo.photos.large === null || undefined ?
                        <div className={h.avaLogin} >
                            <img className={h.ava} src={photo} />
                            <span className={h.userName} > <NavLink to={'/profile/'}>{props.profileInfo.fullName}</NavLink> </span>
                            {/* <img onClick={props.logOut} className={h.logout} src="https://image.flaticon.com/icons/png/512/25/25706.png" />   */}
                            <button className={h.logout} onClick={props.logOut} >Log Out</button>  
                        </div> :
                        <div className={h.avaLogin} >  
                            <img className={h.ava} src={props.profileInfo.photos.large}/>
                            <span className={h.userName} > <NavLink to={'/profile/'}>{props.profileInfo.fullName}</NavLink> </span>
                            {/* <img onClick={props.logOut} className={h.logout} src="https://image.flaticon.com/icons/png/512/25/25706.png"/> */}
                            <button className={h.logout} onClick={props.logOut} >Log Out</button>  
                        </div>}
                    </div> 
            : <NavLink to={'/login'} className={h.authBlock}>Login</NavLink>}
        </div>
            
        {props.windowMode && props.value != '' && props.usersSearch != null
            ? <div className={h.usersSearch} >
                {
                    props.usersSearch.map(u => 
                        <NavLink  className={h.user} to={'/profile/' + u.id}  >  
                            <nav>
                                {u.name}
                            </nav>
                        </NavLink>)
                }
            </div> 
            : <div></div> }
    </header>
}

export default Header;
