import React from 'react';
import h from './Header.module.css'
import {NavLink} from 'react-router-dom'
import photo from '../../assets/images/user.png'
import Preloader from '../common/Preloader/Preloader';
import play from './../../assets/images/playAudioPleer.png'
import next from './../../assets/images/next.png'
import previous from './../../assets/images/previous.png'
import musicIcon from './../../assets/images/—Pngtree—music icon_4490549.png'

const Header = (props) => {

    // const handleChange = (event) => {
    //     props.setValue(event.target.value);
    //   }

    return <header className={h.header}>
        <div className={h.logoBlock} >
            <img className={h.logo} src='https://png.pngtree.com/png-vector/20200908/ourlarge/pngtree-pug-dog-smoke-pipe-illustration-png-image_2341735.jpg' />
            <span className={h.headerName}> <NavLink to={'/profile/'} >Mosset</NavLink> </span>
        </div>
        <div className={h.searchBlock} >
            {/* <form> */}
                <input value={props.value} onDoubleClick={() => {props.setWindowMode(false)}} onChange={props.handleChange} onClick={() => {props.setWindowMode(true)}} className={h.searchUsers} type="text" placeholder="Search.." />
            
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
        <div className={h.music}>
                <img src={musicIcon}/>
            </div>
        <div className={h.loginBlock}>  
            {props.isAuth ?
                props.profileInfo === null ? <Preloader/> :
                    <div>{props.profileInfo.photo === null || undefined ?
                        <div className={h.avaLogin} >
                            <NavLink  className={h.ava} to={'/profile/'}><img className={h.ava} src={photo} /></NavLink>
                            <span className={h.Name} > <NavLink to={'/profile/'}>{props.profileInfo.fullName}</NavLink> </span>
                            {/* <img onClick={props.logOut} className={h.logout} src="https://image.flaticon.com/icons/png/512/25/25706.png" />   */}
                            <button className={h.logout} onClick={props.logOut} >Log Out</button>  
                        </div> :
                        <div className={h.avaLogin} >  
                            <NavLink  className={h.ava} to={'/profile/'}><img className={h.ava} src={props.profileInfo.photo}/></NavLink>
                            <span className={h.Name} > <NavLink to={'/profile/'}>{props.profileInfo.fullName}</NavLink> </span>
                            {/* <img onClick={props.logOut} className={h.logout} src="https://image.flaticon.com/icons/png/512/25/25706.png"/> */}
                            <NavLink className={h.logOutLink} to={'/login'} ><button className={h.logout} onClick={props.logOut} >Log Out</button></NavLink>
                        </div>}
                    </div> 
            : <NavLink to={'/login'} className={h.authBlock}>Login</NavLink>}
        </div>
                        
        {props.windowMode && props.value != '' && props.usersSearch != null
            ? <div className={h.usersSearch} >
                {
                    props.usersSearch.length === 0 ?  <div className={h.notFound} >Not found</div> :
                    props.usersSearch.map(u => 
                        <NavLink  className={h.user} to={'/profile/' + u.id}  >
                            
                                <img className={h.userAva} src={!u.photo ? photo : u.photo} />

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
