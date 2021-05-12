import React from "react"
import s from "./FormContainer.module.css"
import { required } from "../../../utils/validators/validators"
import { Field } from "redux-form"
// import { setHeaderBlur } from "./../../../redux/AppReducer/app-reducer"
import { connect } from "react-redux"
import { compose } from "redux"

export const FormControl = ({ input, meta, child, ...props }) => {
  // debugger
  const hasError = meta?.touched && meta.error
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      {props.children}
    </div>
  )
}

export const Textarea = props => {
  const { input, meta, child, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea
        className={s.textarea}
        // onMouseOut={() => {
        //   props.setHeaderBlur(false)
        // }}
        // onClick={() => {
        //   props.setHeaderBlur(true)
        // }}
        {...input}
        {...restProps}
      />{" "}
    </FormControl>
  )
}

export const Input = props => {
  const { input, meta, child, ...restProps } = props

  return (
    <FormControl {...props}>
      <input
        className={s.input}
        // onMouseOut={() => {
        //   props.setHeaderBlur(false)
        // }}
        // onClick={() => {
        //   props.setHeaderBlur(true)
        // }}
        {...input}
        {...restProps}
      />
    </FormControl>
  )
}

let mapStateToProps = state => {
  return {}
}

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      {...props}
    />{" "}
    {text}
  </div>
)
