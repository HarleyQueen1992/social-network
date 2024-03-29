import React from "react";
import styles from "./FormContainer.module.css";
import { required } from "../../../utils/validators/validators";
import { Field } from "redux-form";
import { useState } from "react";

const FormControl = ({ input, meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl}>
      {children}
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = (props) => {
  const { input, meta, child, error, value, ...restProps } = props;

  let [isFocus, setIsFocus] = useState(false);

  // e.onblur = function () {
  //   e.classList.remove("a");
  // };
  return (
    <FormControl {...props}>
      <label className={styles.labelInput} htmlFor="input__Field">
        <span
          id={"placeholder__" + props.placeholderValue}
          className={
            styles.placeholder +
            " " +
            (input.value.length > 0 ? styles.placeholderSmall : "")
          }
        >
          {props.placeholderValue}
        </span>
        <input
          id={"input__" + input.name}
          className={
            styles.inputField +
            " " +
            (input.value.length > 0 ? styles.inputActive : "")
          }
          {...input}
          {...restProps}
        />
      </label>
    </FormControl>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => (
  <div className={styles.div}>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      {...props}
    />{" "}
    {text}
  </div>
);
