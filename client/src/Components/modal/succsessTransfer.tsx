import React from "react";
import { Link } from "react-router-dom";
export const SuccsessTransfer: React.FC = () => {
  const handleClick = () => {
    const modal = document.getElementById("transfer-modal");
    modal?.classList.add("hidden");
  };
  return (
    <div id="transfer-modal" className="modal hidden">
      <div>
        <h4>Перевод прошел успешно</h4>
        <Link to="/">
          <button onClick={handleClick} className="mybtn">
            Закрыть
          </button>
        </Link>
      </div>
    </div>
  );
};
