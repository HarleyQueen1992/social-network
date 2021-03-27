import React from 'react'
import { createPages } from '../../../utils/pagination';
import s from './Pagination.module.css'

const Pagination = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let page = [];
    
    createPages(page, pagesCount, props.currentPage )

    return (
    <div className={s.pagination} >
        <span onClick={ () => {props.earlyPageNumber() }}>ᐸ</span>
            <span className={s.numberPage} >
                { page.map( p => {
                    return <span className={props.currentPage === p && s.selectedPage} onClick={ () => { props.onPageChenged(p)}}>{p}</span>
                } ) }
            </span>
        <span onClick={ () => {props.increasePageNumber() }}>ᐳ</span>
    </div>)
}

export default Pagination