import { useMutation } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../GraphQl/mutation/crudUser";
interface ConfirmExitProps {
  updateDataFunc: Function;
}
export const ConfirmExit: React.FC<ConfirmExitProps> = ({ updateDataFunc }) => {
  const navigate = useNavigate();
  const [setAuthFunc] = useMutation(setAuth);
  const handleClick = (bool: boolean) => {
    const modal = document.getElementById("confirm-exit");
    if (bool) {
      setAuthFunc({
        variables: {
          email: "",
          password: "",
        },
      });
      updateDataFunc();
    }
    modal?.classList.add("hidden");
  };
  return (
    <div id="confirm-exit" className="modal hidden">
      <div>
        <h4>Вы действительно хотите выйти?</h4>
        <div>
          <button
            onClick={() => {
              handleClick(true);
              navigate("/", { replace: true });
            }}
            className="mybtn"
            style={{ marginRight: "1rem" }}
          >
            Да
          </button>
          <button onClick={() => handleClick(false)} className="mybtn">
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};
