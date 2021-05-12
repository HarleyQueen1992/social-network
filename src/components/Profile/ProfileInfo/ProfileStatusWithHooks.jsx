import React, { useState, useEffect } from "react"
import s from "./ProfileInfo.module.css"
import styled from "styled-components"
import { Input } from "../../common/FromsControls/FormsControls"

const ProfileStatusWithHooks = props => {
  const onStatusChange = e => {
    props.setStatus(e.currentTarget.value)
  }
  return (
    <div>
      {!props.editMode && (
        <div className={s.status}>
          <span className={s.statusTitle}>Status: </span> {props.status}
        </div>
      )}
      {props.editMode && (
        <div>
          <Input
            onChange={onStatusChange}
            className={s.input}
            autoFocus={true}
            value={props.statusState}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatusWithHooks
