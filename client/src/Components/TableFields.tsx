import React from "react";
import { RiFilter2Fill } from "react-icons/ri";
import { BsFilterLeft, BsArrowLeftRight } from "react-icons/bs";
import { FieldGroup } from "./FieldGroup";
import { useAppDispatch, useAppSelector } from "../Hooks/redux";
import {
  changeSortedField,
  changeState,
} from "../redux/reducers/filterReducer";
import { fieldTable } from "../types/interfaces";
import { Header } from "./Header";
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
export const TableFields: React.FC = () => {
  const fields = useAppSelector((state) => state.filterSlice);
  const dispatch = useAppDispatch();
  const handleClick = (sort: boolean, fieldState: any) => {
    if (sort) {
      dispatch(changeSortedField(fieldState));
    }
  };
  return (
    <div className="tableFields">
      <header>
        <RiFilter2Fill
          style={{ color: "#8191B5", width: "1.5rem", height: "auto" }}
        ></RiFilter2Fill>
        <h5>Table fields</h5>
      </header>
      <div>
        <div className="fields">
          {fields.fieldInfo.map((item: fieldTable, index) => {
            if (typeof item.state === "string") {
              return (
                <div key={index} className="field">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`flexCheckDefault-${index}`}
                      defaultChecked
                      onChange={(e) =>
                        dispatch(
                          changeState({
                            nameField: item.state,
                            value: e.target.checked,
                          })
                        )
                      }
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheckDefault-${index}`}
                    >
                      {item.title}
                    </label>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(item.sort, item.state);
                    }}
                  >
                    {Icon(item.sort, item.state === fields.sortedField)}
                  </div>
                </div>
              );
            } else {
              return <FieldGroup key={index} item={item}></FieldGroup>;
            }
          })}
        </div>
      </div>
    </div>
  );
};
