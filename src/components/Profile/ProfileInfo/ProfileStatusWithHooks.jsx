import React from "react"
import s from "./ProfileInfo.module.css"
import { Input } from "../../common/FromsControls/FormsControls"

const ProfileStatusWithHooks = props => {
  const width = window.innerWidth

  const onStatusChange = e => {
    props.setStatus(e.currentTarget.value)
  }
  const activateEditMode = () => {
    // alert("asda")
    props.setEditMode(true)
  }
  // alert(isA)
  // debugger

  return (
    <>
      <div>
        {!props.editMode &&
          (props.isSmall ? (
            <div className={s.status}>
              <span className={s.statusTitle}>Status: </span> {props.status}
            </div>
          ) : (
            <div onClick={activateEditMode} className={s.status}>
              <span className={s.statusTitle}>Status: </span> {props.status}
            </div>
          ))}
        {props.editMode && (
          <div>
            {!props.isSmall ? (
              <Input
                onChange={onStatusChange}
                className={s.input}
                autoFocus={true}
                value={props.statusState}
                onBlur={props.deactivateEditMode}
              />
            ) : (
              <Input
                onChange={onStatusChange}
                className={s.input}
                autoFocus={true}
                value={props.statusState}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileStatusWithHooks
