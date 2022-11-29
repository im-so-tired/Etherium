import { useField, ErrorMessage } from "formik";
import React from "react";
interface TransferTextFieldProps {
  placeholder: string;
  type: string;
  name: string;
  error?: string;
  pattern?: string;
}
export const TransferTextField: React.FC<TransferTextFieldProps> = ({
  error,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="textField">
      <input
        {...field}
        {...props}
        autoComplete="off"
        className={`${(meta.error || error) && meta.touched && "inputError"}`}
      ></input>
      {error ? <span className="errorMessage">{error}</span> : null}
      <ErrorMessage
        component={"div"}
        className="errorMessage"
        name={field.name}
      ></ErrorMessage>
    </div>
  );
};
