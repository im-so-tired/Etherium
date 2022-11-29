import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Formik, Form, FormikHelpers } from "formik";
import { TextField } from "../Components/FormComponents/TextField";
import * as yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { addUser } from "../GraphQl/mutation/crudUser";
import { getAllUsers } from "../GraphQl/query/queryBlock";
import { IUser } from "../types/interfaces";
import { Link } from "react-router-dom";
import { SuccessRegisterModal } from "../Components/modal/succsessRegister";
interface Values {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
interface IErrorState {
  emailError: boolean;
}
const InitErrorState: IErrorState = {
  emailError: false,
};
export const Authorization: React.FC = () => {
  const [errorState, setErrorState] = useState(InitErrorState);
  const { data: users, loading: loadingUsers, refetch } = useQuery(getAllUsers);
  const [createUser, { data, loading }] = useMutation(addUser);
  if (loadingUsers) {
    return <h1>Loading...</h1>;
  }
  const validate = yup.object({
    email: yup.string().email("Email is invalid").required("Required"),
    phone: yup
      .string()
      .max(11, "Must be 11 characters or less")
      .required("Required"),
    password: yup
      .string()
      .min(6, "Must be 6 characters or more")
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm password"),
  });
  return (
    <div>
      <SuccessRegisterModal></SuccessRegisterModal>
      <Header></Header>
      <Formik
        initialValues={{
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const newArray = users.getAllUsers.filter(
            (user: IUser) => user.email === values.email
          );
          if (newArray.length !== 0) {
            setErrorState({ emailError: true });
          } else {
            const modal = document.getElementById("entry-modal");
            modal?.classList.remove("hidden");
            setErrorState({ emailError: false });
            refetch();
            createUser({
              variables: {
                email: values.email,
                password: values.password,
                phone: values.phone,
              },
            });
          }
        }}
        validationSchema={validate}
      >
        <Form className="main-form">
          <div>
            <h3>Sing Up</h3>
            <h3>One account</h3>
            <TextField
              label="Email address"
              name="email"
              type="text"
              errorEmail={errorState.emailError}
            ></TextField>
            <TextField
              label="Phone"
              name="phone"
              type="text"
              pattern="^[ 0-9]+$"
            ></TextField>
            <TextField
              label="Password"
              name="password"
              type="password"
            ></TextField>
            <TextField
              label="Confirm password"
              name="confirmPassword"
              type="password"
            ></TextField>
            <button type="submit">Create account</button>
            <h5>
              Already have an account? <Link to="/entry">Sign in</Link>
            </h5>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
