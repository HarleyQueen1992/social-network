import React, {useState} from 'react';
import h from './Header.module.css'
import {NavLink} from 'react-router-dom'
import photo from '../../assets/images/user.png'
import Preloader from '../common/Preloader/Preloader';
import play from './../../assets/images/playAudioPleer.png'
import next from './../../assets/images/next.png'
import previous from './../../assets/images/previous.png'
import musicIcon from './../../assets/images/—Pngtree—music icon_4490549.png'
import Users from './../../assets/images/users2.png'
import Frieds from './../../assets/images/friends.png'
import Message from './../../assets/images/message.png'
import Profile from './../../assets/images/profile.png'
import News from './../../assets/images/newspaper.png'
import Posts from './../../assets/images/chat.png'
import Sub from './../../assets/images/renew.png'
import Services from './../../assets/images/add.png'
import styled from "styled-components";

const Header = (props) => {
    const [isActive, setIsActive] = useState(false)

    // const handleChange = (event) => {
    //     props.setValue(event.target.value);
    //   }
    return <div className={h.header}>
            <div className={h.logoBlock} >
                <img className={h.logo} src='https://png.pngtree.com/png-vector/20200908/ourlarge/pngtree-pug-dog-smoke-pipe-illustration-png-image_2341735.jpg' />
                <span className={h.headerName}> <NavLink to={'/profile/'} >Mosset</NavLink> </span>
            </div>
            <div onClick={ () => {setIsActive(!isActive)}} className={h.HeaderBurger + " " + (isActive ? h.active : "")} >
                <span></span>
            </div>
            <div className={h.HeaderMenu + " " + (isActive ? h.active : "")} >
                <NavLink to='1' >Profile</NavLink>
                <NavLink to='1'>Posts</NavLink>
                <NavLink to='1'>News</NavLink>
                <NavLink to='1'>Users</NavLink>
                <NavLink to='1'>Subscriptions</NavLink>

            </div>
            
            <div className={h.searchBlock} >
                {/* <form> */}
                    <input value={props.value} onDoubleClick={() => {props.setWindowMode(false)}} onChange={props.handleChange} onClick={() => {props.setWindowMode(true)}} className={h.searchUsers} type="text" placeholder="Search.." />
                
                {/* </form> */}
                
            </div>
            <div className={h.navHead} >
            <div className={h.headItem}><NavLink className={h.linkBlock} to={"/news"} >
                    <img className={h.imgNews} src={News}/>
                        <span className={h.headName} >News</span>
                    </NavLink>
                </div>
                <div className={h.headItem} ><NavLink className={h.linkBlock} to={"/services"} >
                    <img className={h.imgServices} src={Services}/>
                        <span className={h.headName} >Services</span>
                    </NavLink>
                </div>
                <div className={h.headItem}><NavLink className={h.linkBlock} to={'/posts'} >
                    <img className={h.imgPosts} src={Posts}/>
                        <span className={h.headName} >Posts</span>
                    </NavLink>
                </div>
                <div className={h.headItem}>
                    <NavLink className={h.linkBlock} to={"/profile"} >    
                    <img className={h.imgProfile} src={Profile}/>
                        <span className={h.headName} >Profile</span>
                    </NavLink>
                </div>

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
    </div>
    
}

export default Header;
