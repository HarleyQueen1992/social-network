import React from 'react'
import s from './FormContainer.module.css'

export const  FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")} >
            <div>
                {props.children}
            </div>
            <div>      
                {hasError && <div>{meta.error}</div> }
            </div>
        </div>
    )
} 

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;

    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}