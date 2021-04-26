import React, { useEffect, useState } from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { createPages } from '../../utils/pagination';
import { NavLink } from 'react-router-dom';
import {usersAPI} from '../../API/api'
import Pagination from '../common/Pagination/Pagination'
import axios from 'axios';
const Users = (props) => {

    // const [userss, setUsers] = useState([])
    // const [currentPage, setCurrentPage] = useState(1)
    // const [isFetching, setIsFetching] = useState(true)
    // const [totalCount, setTotalCount] = useState(0)

    // useEffect( () => {
    //     if (isFetching) {
            
    //         // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}`)
    //         usersAPI.getUsers(currentPage, 10)
    //             .then(data => {
    //                 setUsers([...userss, ...data.items])
    //                 setCurrentPage( prevState => prevState + 1)
    //                 setTotalCount(data.totalCount)
    //             })
    //             .finally( () => {
    //                 setIsFetching(false)
    //             })
    //     }

    // }, [isFetching])

    useEffect( () => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    })
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) == 0 && props.users.length < props.totalUsersCount) {
            props.toggleIsFatching(true)
        }
    }

    return <div className={s.users} >
        {
            props.users.map( u => <div className={s.user} key={u.id}>
                <div className={s.leftPart} >
                    <div className={s.photoUsers} >
                        <NavLink to={'/profile/' + u.id} ><img src={ u.photo != null ? u.photo : userPhoto } className={s.photo} /></NavLink>
                    </div>
                    {/* <div className={s.followed} >
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
                    </div> */}
                </div>
                <div className={s.rightPart} >
                    <div className={s.name} >
                        {u.name}
                    </div>
                    <div className={s.status} >
                        {!u.status ? u.status :
                            <span>status: {u.status}</span>   }
                    </div>
                    <div className={s.city} >
                        {u.followed ? <span>friend</span> : <span></span>}
                    </div>
                    <div className={s.country} >
                        {/* {u.location.country}, */}
                    </div>
                    
                </div>
            </div>)      
        }
                    {/* <Pagination totalUsersCount={props.totalUsersCount}
                                pageSize={props.pageSize}
                                currentPage={props.currentPage}
                                earlyPageNumber={props.earlyPageNumber} 
                                onPageChenged={props.onPageChenged} 
                                increasePageNumber={props.increasePageNumber}/> */}

            
        </div> 
}

export default Users;