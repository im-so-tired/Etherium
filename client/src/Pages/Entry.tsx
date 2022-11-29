import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Formik, Form, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { getAllUsers } from "../GraphQl/query/queryBlock";
import { IUser } from "../types/interfaces";
import { setAuth } from "../GraphQl/mutation/crudUser";
import { EntryTextField } from "../Components/FormComponents/EntryTextField";
interface IWrongData {
  email: boolean;
  password: boolean;
}
const wrongData: IWrongData = {
  email: false,
  password: false,
};
interface Values {
  email: string;
  password: string;
}
export const Entry: React.FC = () => {
  let navigate = useNavigate();
  const [wrongDataState, setWrongDataState] = useState(wrongData);
  const { data: users, loading: isLoading, refetch } = useQuery(getAllUsers);
  const [setAuthFunc] = useMutation(setAuth);
  useEffect(() => {
    refetch();
  }, []);
  const emailError = wrongDataState.email ? "Неправильный email" : "";
  const passwordError = wrongDataState.password ? "Неправильный пароль" : "";
  return (
    <div>
      <Header></Header>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const newArray = users.getAllUsers.filter(
            (user: IUser) => user.email === values.email
          );
          if (newArray.length === 0) {
            setWrongDataState((prev) => ({ password: true, email: true }));
          } else {
            if (newArray[0].password !== values.password) {
              setWrongDataState((prev) => ({ email: false, password: true }));
            } else {
              setWrongDataState({ password: false, email: false });
              console.log(values);
              setAuthFunc({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              });
              navigate("/", { replace: true });
            }
          }
        }}
      >
        <Form className="main-form">
          <div className="entry">
            <h3>Введите ваши данные</h3>
            <EntryTextField
              label="Email address"
              name="email"
              type="text"
              error={emailError}
            ></EntryTextField>
            <EntryTextField
              label="Password"
              name="password"
              type="password"
              error={passwordError}
            ></EntryTextField>
            <button type="submit">Войти</button>
            <h5>
              Нет аккаунта? <Link to="/auth">Зарегистрируйтейсь</Link>
            </h5>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
