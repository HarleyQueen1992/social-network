import React from 'react'
import userPhoto from '../../assets/images/user.png'
import { createPages } from '../../utils/pagination';
import { NavLink } from 'react-router-dom';
import s from './Friends.module.css'
import FriendsPage from "./FriendsPage/FriendsPage";
import Pagination from '../common/Pagination/Pagination'

debugger;
const Friends = (props) => {

    let pagesCount = Math.ceil(props.totalFriendsCount / props.pageSize);

    let page = []
    // let FriendsElements = props.friends === null ? <Preloader/> : props.friends.map( f => <FriendsPage name={f.fullName}/>);
    
    createPages(page, pagesCount, props.currentPage)

    return (
        <div>
            {
                props.friends.map(f => <div className={s.friend} >
                    <div className={s.leftPart} >
                        <div className={s.photoUsers} >
                            <NavLink to={'/profile/' + f.id} ><img src={ f.photos.small != null ? f.photos.small : userPhoto } className={s.photo} /></NavLink>
                        </div>
                    </div>
                    <div className={s.rightPart}>
                        <span className={s.name}>{f.name}</span><br/>
                        <span className={s.writeMessage} ><a href="#">to write a message</a></span>           
                    </div>
                </div>)
                
            }
            {/* {!props.friends ? <Preloader/> : props.friends.map(f => <div>{f.fullName}</div> )} */}

            <Pagination currentPage={props.currentPage} 
                        page={page} 
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
                 
    )

}
export default Friends