import React from "react"
import s from "./FormContainer.module.css"
import { Field } from "redux-form"

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
