import React, { useEffect, useState } from "react";
import { BsArrowLeftRight, BsFilterLeft } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../Hooks/redux";
import {
  changeStateGroup,
  changeSortedFieldGroup,
} from "../redux/reducers/filterReducer";
import { currency, fieldGroup } from "../types/interfaces";
interface PropsFieldGroup {
  item: any;
}
interface initialStateI {
  main: boolean;
  currency: boolean[];
}
const initialState: initialStateI = {
  main: true,
  currency: [true, true],
};
const Icon = (sort: boolean, sortedNow: boolean | undefined) => {
  if (!sort) {
    return null;
  } else {
    if (sortedNow) {
      return <BsFilterLeft className="filter-icon"></BsFilterLeft>;
    } else {
      return <BsArrowLeftRight className="no-filter-icon"></BsArrowLeftRight>;
    }
  }
};
export const FieldGroup: React.FC<PropsFieldGroup> = ({ item }) => {
  const dispatch = useAppDispatch();
  const sortedField = useAppSelector((state) => state.filterSlice.sortedField);
  const [checkState, setCheckState] = useState({
    ...initialState,
  });
  useEffect(() => {
    dispatch(
      changeStateGroup({
        fieldName: item.state.name,
        value: checkState,
      })
    );
  }, [checkState]);
  const handleChangeMain = (value: boolean) => {
    dependencyСheckMain({ ...checkState, main: value });
  };
  const handleChangeCurrency = (index: number, value: boolean) => {
    let newCurrency = [...checkState.currency];
    newCurrency[index] = value;
    console.log(value);
    dependencyСheckCurrency({ ...checkState, currency: newCurrency });
  };
  const dependencyСheckMain = (objAsState: initialStateI) => {
    if (!objAsState.main) {
      setCheckState((prev) => ({
        main: false,
        currency: [false, false],
      }));
    } else {
      setCheckState({ main: true, currency: [true, true] });
    }
  };
  const dependencyСheckCurrency = (objAsState: initialStateI) => {
    let bool = true;
    objAsState.currency.map((cur) => {
      bool = bool && !cur;
      return cur;
    });
    if (bool) {
      setCheckState({ currency: objAsState.currency, main: false });
    } else {
      setCheckState({ currency: objAsState.currency, main: true });
    }
  };
  const handleChangeSorted = (sortedName: string, currencyName: string) => {
    if (item.sort) {
      dispatch(
        changeSortedFieldGroup({
          sortedName: sortedName,
          currencyName: currencyName,
        })
      );
    }
  };
  return (
    <>
      <div className="field">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`flexCheckDefault-title`}
            checked={checkState.main}
            onChange={(e) => handleChangeMain(e.target.checked)}
          ></input>
          <label
            className="form-check-label"
            htmlFor={`flexCheckDefault-title`}
          >
            {item.title}
          </label>
        </div>
      </div>
      <div className="field-group">
        {item.state.currency.map((currency: currency, index: number) => {
          return (
            <div key={index} className="field">
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`flexCheckDefault-${currency.currencyName}`}
                  checked={checkState.currency[index]}
                  onChange={(e) =>
                    handleChangeCurrency(index, e.target.checked)
                  }
                ></input>
                <label
                  className="form-check-label"
                  htmlFor={`flexCheckDefault-${currency.currencyName}`}
                >
                  {currency.currencyName}
                </label>
              </div>
              <div
                onClick={() =>
                  handleChangeSorted(item.state.name, currency.currencyName)
                }
              >
                {Icon(
                  item.sort,
                  typeof sortedField !== "string" &&
                    sortedField.sortedName === item.state.name &&
                    sortedField.currencyName === currency.currencyName
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
