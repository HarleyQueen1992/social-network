import React from "react";
import styles from "./FormContainer.module.css";
import { required } from "../../../utils/validators/validators";
import { Field } from "redux-form";

const FormControl = (props) => {
  return <div className={styles.formControl}>{props.children}</div>;
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
  const { input, meta, child, error, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input className={styles.inputField} {...input} {...restProps} />
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
);
