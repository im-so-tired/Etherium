import { Form, Formik } from "formik";
import React, { useState } from "react";
import { TransferTextField } from "../Components/FormComponents/TransferTextField";
import { Header } from "../Components/Header";
import * as yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { getAllUsers, getAuth } from "../GraphQl/query/queryBlock";
import { IUser } from "../types/interfaces";
import { addTransfer, createBlock } from "../GraphQl/mutation/crudUser";
import { SuccsessTransfer } from "../Components/modal/succsessTransfer";
interface ITransferValue {
  phone: string;
  message: string;
  sum: string;
}
const transferValue: ITransferValue = {
  phone: "",
  message: "",
  sum: "",
};
export const TransferPage: React.FC = () => {
  const [phoneError, setPhoneError] = useState(false);
  const { data: user } = useQuery(getAuth);
  const [addTransferFunc] = useMutation(addTransfer);
  const [createBlockFunc] = useMutation(createBlock);
  const validate = yup.object({
    phone: yup.string().required("Обязательное поле"),
    message: yup.string(),
    sum: yup.string().required("Обязательное поле"),
  });
  const { data: usersInfo, loading: isLoading } = useQuery(getAllUsers);
  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <div>
      <Header></Header>
      <SuccsessTransfer></SuccsessTransfer>
      <div>
        <Formik
          initialValues={transferValue}
          onSubmit={(values, actions) => {
            const newArray = usersInfo.getAllUsers.filter(
              (user: IUser) => user.phone === values.phone
            );
            if (newArray.length === 0) {
              setPhoneError(true);
            } else {
              setPhoneError(false);
              addTransferFunc({
                variables: {
                  from: user.getAuth.email,
                  to: values.phone,
                  sum: Number(values.sum),
                  message: values.message,
                },
              });
              createBlockFunc({
                variables: {
                  sum: Number(values.sum),
                },
              });
              const modal = document.getElementById("transfer-modal");
              modal?.classList.remove("hidden");
            }
          }}
          validationSchema={validate}
        >
          <Form className="transfer-form">
            <div>
              <h2>По номеру телефона</h2>
              <TransferTextField
                name="phone"
                type="text"
                pattern="^[ 0-9]+$"
                placeholder="Номер телефона"
                error={phoneError ? "Неправильно набран номер" : ""}
              ></TransferTextField>
              <TransferTextField
                name="message"
                type="text"
                placeholder="Сообщение получателю"
              ></TransferTextField>
              <TransferTextField
                name="sum"
                type="text"
                pattern="^[ 0-9]+$"
                placeholder="Сумма, ETH"
              ></TransferTextField>
              <button type="submit" className="mybtn">
                Перевести
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
