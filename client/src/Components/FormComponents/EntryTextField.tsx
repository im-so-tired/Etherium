import { useField } from "formik";
import React from "react";
interface EntryTextFieldProps {
  label: string;
  type: string;
  name: string;
  error?: string;
}
export const EntryTextField: React.FC<EntryTextFieldProps> = ({
  label,
  error,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="textField">
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        className={`${error && meta.touched && "inputError"}`}
      ></input>
      {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};
