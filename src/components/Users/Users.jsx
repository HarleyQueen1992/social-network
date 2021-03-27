import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { createPages } from '../../utils/pagination';
import { NavLink } from 'react-router-dom';
import {usersAPI} from '../../API/api'
import Pagination from '../common/Pagination/Pagination'

const Users = (props) => {

    return <div>
        {
            props.users.map( u => <div className={s.users} key={u.id}>
                <div className={s.leftPart} >
                    <div className={s.photoUsers} >
                        <NavLink to={'/profile/' + u.id} ><img src={ u.photos.small != null ? u.photos.small : userPhoto } className={s.photo} /></NavLink>
                    </div>
                    <div className={s.followed} >
                        { u.followed
                            ? <button 
                                    disabled={props.followingInProgress.some(id => id === u.id)} 
                                    className={s.but} 
                                    onClick={ () => { props.unfollow(u.id)}}>Unfollow
                            </button> 
                            : <button 
                                    disabled={props.followingInProgress.some(id => id === u.id)} 
                                    className={s.but} 
                                    onClick={ () => { props.follow(u.id)} }>Follow
                            </button> }
                    </div>
                </div>
                <div className={s.rightPart} >
                    <div className={s.name} >
                        {u.name}
                    </div>
                    <div className={s.status} >
                        {u.status}
                    </div>
                    <div className={s.country} >
                        {/* {u.location.country}, */}
                    </div>
                    <div className={s.city} >  
                        {/* {u.location.city} */}
                    </div>
                </div>
            </div>)      
        }
                    <Pagination totalUsersCount={props.totalUsersCount}
                        pageSize={props.pageSize}
                        currentPage={props.currentPage}
                        earlyPageNumber={props.earlyPageNumber} 
                        onPageChenged={props.onPageChenged} 
                        increasePageNumber={props.increasePageNumber}/>
            {/* <div className={s.pagination} >
                <span onClick={ () => {props.earlyPageNumber() }}>ᐸ</span>
                    <span className={s.numberPage} >
                        { page.map( p => {
                            return <span className={props.currentPage === p && s.selectedPage} onClick={ () => { props.onPageChenged(p)}}>{p}</span>
                        } ) }
                    </span>
                <span onClick={ () => {props.increasePageNumber() }}>ᐳ</span>
            </div> */}
            
        </div> 
}
export default Users;
