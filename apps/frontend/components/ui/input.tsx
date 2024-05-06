import React from 'react'
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
    <input {...props} ref={ref}/>
    )
  }
)

Input.displayName = "Input"
export {Input}
