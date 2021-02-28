import s from './FriendsPage.module.css'

const FriendsPage = (props) => {
    return (
        <div className={s.friendPage}>
            <div className={s.friendContener}>
                {props.friends.map(f => <div>{f.fullName}</div> )}
            </div>
        </div>
    )

}
export default FriendsPage;