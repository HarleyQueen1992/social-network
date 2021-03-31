import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);   
    }
    
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.status !== prevProps.status) {
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // }
    
        return (
            <div>
                {!editMode &&
                    <div>
                        <span className={s.status} onDoubleClick={activateEditMode } >status: {props.status}</span>
                    </div>}
                {editMode &&
                    <div>
                        <input onChange={onStatusChange} className={s.input} autoFocus={true} onBlur={deactivateEditMode } value={status}/>
                    </div>}
            </div>)

    }


export default ProfileStatusWithHooks;
