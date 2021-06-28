import React, {useState} from "react"
import s from './Header.module.css'
import News from './../News/NewsContainer'
import Home from './../../assets/images/homeW.png'
import Profile from './../../assets/images/profileW.png'
import Posts from './../../assets/images/postsW.png'
import UsersW from './../../assets/images/usersW.png'
import SettingsW from './../../assets/images/settingsW.png'
import FriendsW from './../../assets/images/friendsW.png'
import SearchW from './../../assets/images/searchW.png'
import SwipeableViews from 'react-swipeable-views';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NavLink, Redirect, useHistory } from "react-router-dom";

const Header = props => {
    let [index, setIndex] = useState(0)
    const handleChange = (event, value) => {
      setIndex(value);
      
    }
    const handleChangeIndex = index => {
      setIndex(index)
    }
    
    return (
      <div className={s.header} >
        <div className={s.titleSite} >
            <span className={s.logo} >Mosset</span>
            <img className={s.searchImg} src={SearchW} alt="search"/>
        </div>
        {/* <div className={s.listOfCategories} > */}
        <Tabs value={index} className={s.listOfCategories} onChange={handleChange}>
            <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Home} /></div>} />
            <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Profile} /></div>} />
            <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={Posts} /></div>} />
            <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={UsersW} /></div>} />
            <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={SettingsW} /></div>} />
            <Tab className={s.tab} label={<div className={s.category} ><img className={s.categoriesImg} src={FriendsW} /></div>} />
        </Tabs>

        <SwipeableViews
          index={index}
          enableMouseEvents
          onChangeIndex={handleChangeIndex}
        >
            <div>1</div>
            <div>1</div>
            <div>3</div>
            <div>2</div>
            <div>4</div>
            <div>5</div>

            
        </SwipeableViews>
            {/* <div className={s.category}>
                <img className={s.categoriesImg} src={Profile} alt="profile img"/>
            </div>
            <div className={s.category}>
                <img className={s.categoriesImg} src={Posts} alt="posts img"/>
            </div>
            <div className={s.category} >
                <img className={s.categoriesImg} src={UsersW} alt="users img"/>
            </div>
            <div className={s.category} >
                <img className={s.categoriesImg} src={SettingsW} alt="settings img"/>
            </div>
            <div className={s.category} >
                <img className={s.categoriesImg} src={FriendsW} alt="friends img"/>
            </div> */}
        {/* </div> */}
      </div>   
    )
}

export default Header;