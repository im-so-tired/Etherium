import { Link } from "react-router-dom";
import logo from "../assets/ethereum.svg";
import React, { useEffect } from "react";
import { BsDoorOpen, BsDoorClosed } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { getAuth } from "../GraphQl/query/queryBlock";
import { ConfirmExit } from "./modal/confirmExit";
export const Header: React.FC = () => {
  const { data, loading, refetch } = useQuery(getAuth, { pollInterval: 500 });
  const updateData = () => {
    refetch();
  };
  useEffect(() => {
    refetch();
  });
  if (loading) {
    return <h1>Идёт загрузка</h1>;
  }
  const handleClick = () => {
    const modal = document.getElementById("confirm-exit");
    modal?.classList.remove("hidden");
  };
  return (
    <header className="mainHeader">
      <div>
        <Link to="/">
          <img src={logo} alt="logo"></img>
        </Link>
        <h3>Блоки Ethereum</h3>
      </div>
      <div>
        {!data.getAuth.email ? (
          <Link to="/entry">
            <BsDoorOpen></BsDoorOpen>
            <h5>Войти</h5>
          </Link>
        ) : (
          <>
            <ConfirmExit updateDataFunc={updateData}></ConfirmExit>
            <Link to="/transfer">
              <BiTransfer></BiTransfer>
              <h5>Перевести</h5>
            </Link>
            <span className="ssilka" onClick={handleClick}>
              <BsDoorClosed></BsDoorClosed>
              <h5>Выйти</h5>
            </span>
          </>
        )}
      </div>
    </header>
  );
};
