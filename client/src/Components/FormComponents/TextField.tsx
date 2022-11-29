import { useField, ErrorMessage } from "formik";
import React from "react";
interface textFieldProps {
  label: string;
  type: string;
  name: string;
  pattern?: string;
  errorEmail?: boolean;
}
export const TextField: React.FC<textFieldProps> = ({
  label,
  errorEmail,
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
        className={`${meta.error && meta.touched && "inputError"}`}
      ></input>
      {errorEmail ? (
        <span className="errorMessage">
          Пользователь с этим email уже существует
        </span>
      ) : null}
      <ErrorMessage
        component={"div"}
        className="errorMessage"
        name={field.name}
      ></ErrorMessage>
    </div>
  );
};
