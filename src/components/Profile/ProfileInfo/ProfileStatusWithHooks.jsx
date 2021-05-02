import React, { useState, useEffect } from "react"
import s from "./ProfileInfo.module.css"
import styled from "styled-components"

const ProfileStatusWithHooks = props => {
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = e => {
    setStatus(e.currentTarget.value)
  }
  return (
    <div>
      {!editMode && (
        <div className={s.status} onDoubleClick={activateEditMode}>
          <span className={s.statusTitle}>Status: </span> {props.status}
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            className={s.input}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatusWithHooks
