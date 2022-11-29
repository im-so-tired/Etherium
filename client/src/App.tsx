import React from "react";
import { HistoryTransaction } from "./Pages/HistoryTransaction";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Entry } from "./Pages/Entry";
import { Authorization } from "./Pages/Authorization";
import { TransferPage } from "./Pages/Transfer";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HistoryTransaction></HistoryTransaction>}
          ></Route>
          <Route path="/entry" element={<Entry></Entry>}></Route>
          <Route path="/auth" element={<Authorization></Authorization>}></Route>
          <Route
            path="/transfer"
            element={<TransferPage></TransferPage>}
          ></Route>
          <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
