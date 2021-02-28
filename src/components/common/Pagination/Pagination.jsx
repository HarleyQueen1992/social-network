import React from 'react'
import s from './Pagination.module.css'

const Pagination = (props) => {
    return (
    <div className={s.pagination} >
        <span onClick={ () => {props.earlyPageNumber() }}>ᐸ</span>
            <span className={s.numberPage} >
                { props.page.map( p => {
                    return <span className={props.currentPage === p && s.selectedPage} onClick={ () => { props.onPageChenged(p)}}>{p}</span>
                } ) }
            </span>
        <span onClick={ () => {props.increasePageNumber() }}>ᐳ</span>
    </div>)
}

export default Pagination