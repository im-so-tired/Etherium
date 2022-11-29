import React from "react";
import logo from "../assets/ethereum.svg";
import { TableFields } from "../Components/TableFields";
import { MainTable } from "../Components/MainTable";
import { Header } from "../Components/Header";
export const HistoryTransaction: React.FC = () => {
  return (
    <div className="HistoryTrans">
      <Header></Header>
      <main>
        <TableFields></TableFields>
        <MainTable></MainTable>
      </main>
    </div>
  );
};
