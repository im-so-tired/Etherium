import React from "react";
import { Link } from "react-router-dom";
export const SuccessRegisterModal: React.FC = () => {
  return (
    <div id="entry-modal" className="modal hidden">
      <div>
        <h4>Вы успешно зарегистрировались!</h4>
        <Link to="/entry">
          <button className="mybtn">Войти</button>
        </Link>
      </div>
    </div>
  );
};
