import React from 'react';
import s from './Users.module.css'
import * as axios from 'axios'
import userPhoto from '../../assets/images/user.png'

class UsersC extends React.Component {
    
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        })
    }
    
    onPageChenged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        })
    }
    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let page = [];

        for (let i = 1; i <= pagesCount; i++) page.push(i);
        

        return <div>
            <div>
                { page.map( p => {
                    return <span className={this.props.currentPage === p && s.selectedPage} onClick={ () => { this.onPageChenged(p)}}>{p}</span>
                } ) }
            </div>

        {
            this.props.users.map( u => <div className={s.users} key={u.id}>
                <div className={s.leftPart} >
                    <div className={s.photoUsers} >
                        <img src={ u.photos.small != null ? u.photos.small : userPhoto } className={s.photo} />
                    </div>
                    <div className={s.followed} >
                        { u.followed
                            ? <button className={s.but} onClick={ () => { this.props.unfollow(u.id) }  }>Unfollow</button> 
                            : <button className={s.but} onClick={ () => { this.props.follow(u.id) } }>Follow</button> }
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
            
        </div> 
    }
}
export default UsersC;