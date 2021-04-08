import React from 'react'
import userPhoto from '../../assets/images/user.png'
import { createPages } from '../../utils/pagination';
import { NavLink } from 'react-router-dom';
import s from './Friends.module.css'
import FriendsPage from "./FriendsPage/FriendsPage";
import Pagination from '../common/Pagination/Pagination'

const Friends = (props) => {


    return (
        <div>
            {
                props.friends.map(f => <div className={s.friend} >
                    <div className={s.leftPart} >
                        <div className={s.photoUsers} >
                            <NavLink to={'/profile/' + f.id} ><img src={ f.photo != null ? f.photo : userPhoto } className={s.photo} /></NavLink>
                        </div>
                    </div>
                    <div className={s.rightPart}>
                        <span className={s.name}>{f.name}</span>
                        <span className={s.writeMessage} ><a href="#">to write a message</a></span>           
                    </div>
                </div>)
                
            }

            <Pagination currentPage={props.currentPage}
                        pageSize={props.pageSize}
                        totalUsersCount={props.totalFriendsCount}
                        earlyPageNumber={props.earlyPageNumber} 
                        onPageChenged={props.onPageChenged} 
                        increasePageNumber={props.increasePageNumber}/>
        </div>
                 
    )

}
export default Friends