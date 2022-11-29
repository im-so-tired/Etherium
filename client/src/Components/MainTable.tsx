import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBlock } from "../GraphQl/query/queryBlock";
import { useAppDispatch, useAppSelector } from "../Hooks/redux";
import { blockType, fieldTable } from "../types/interfaces";
import { BsArrowLeftRight, BsFilterLeft } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import {
  changeSortedField,
  changeSortedFieldGroup,
} from "../redux/reducers/filterReducer";
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
export const MainTable: React.FC = () => {
  const { data, loading, refetch } = useQuery(getBlock);
  const [tableElements, setTableElements] = useState<blockType[]>();
  const stateField = useAppSelector((state) => state.filterSlice.fieldInfo);
  const filterField = useAppSelector((state) => state.filterSlice.sortedField);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!loading) {
      let newArray = [...data.getBlocks];
      newArray.sort((a: blockType, b: blockType) => {
        if (typeof filterField === "string") {
          return b[filterField] - a[filterField];
        } else {
          if (filterField.currencyName === "ETH") {
            return b[filterField.sortedName][0] - a[filterField.sortedName][0];
          } else {
            return b[filterField.sortedName][1] - a[filterField.sortedName][1];
          }
        }
      });
      setTableElements(newArray);
    }
  }, [data, filterField]);
  useEffect(() => {
    refetch();
  });
  if (loading || !filterField || !tableElements) {
    return <h5>Loading</h5>;
  }
  const handleClick = (sort: boolean, fieldState: any) => {
    if (sort) {
      dispatch(changeSortedField(fieldState));
    }
  };
  const handleClickGroup = (
    sort: boolean,
    sortedName: string,
    currencyName: string
  ) => {
    if (sort) {
      dispatch(
        changeSortedFieldGroup({
          sortedName: sortedName,
          currencyName: currencyName,
        })
      );
    }
  };
  return (
    <div className="mainTable">
      <table>
        <thead>
          <tr>
            {stateField.map((item: fieldTable) => {
              if (item.active) {
                let pointerCursor = "";
                if (item.sort) {
                  pointerCursor = "pointerCursor";
                }
                if (typeof item.state === "string") {
                  return (
                    <td key={uuidv4()}>
                      <span
                        className={pointerCursor}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(item.sort, item.state);
                        }}
                      >
                        {Icon(item.sort, item.state === filterField)}
                        {item.title}
                      </span>
                    </td>
                  );
                } else {
                  return item.state.currency.map((currency) => {
                    if (currency.active && typeof item.state !== "string") {
                      return (
                        <td key={uuidv4()}>
                          <span
                            onClick={() => {
                              if (typeof item.state !== "string") {
                                handleClickGroup(
                                  item.sort,
                                  item.state.name,
                                  currency.currencyName
                                );
                              }
                            }}
                            className={pointerCursor}
                          >
                            {Icon(
                              item.sort,
                              typeof filterField !== "string" &&
                                typeof item.state !== "string" &&
                                filterField.sortedName === item.state.name &&
                                filterField.currencyName ===
                                  currency.currencyName
                            )}
                            {`${item.title} (${currency.currencyName})`}
                          </span>
                        </td>
                      );
                    } else {
                      return null;
                    }
                  });
                }
              } else {
                return null;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {tableElements.map((element: blockType, index: number) => {
            let trBackground = "";
            index % 2 === 0
              ? (trBackground = "dark-stroka")
              : (trBackground = "light-stroka");
            return (
              <tr key={uuidv4()} className={trBackground}>
                {stateField.map((item: fieldTable) => {
                  if (item.active) {
                    if (typeof item.state === "string") {
                      return (
                        <td key={uuidv4()}>
                          <span>{element[item.state]}</span>
                        </td>
                      );
                    } else {
                      return item.state.currency.map(
                        (currency, indexCur: number) => {
                          if (currency.active) {
                            return (
                              <td key={uuidv4()}>
                                <span>{element.totalAmount[indexCur]}</span>
                              </td>
                            );
                          } else {
                            return null;
                          }
                        }
                      );
                    }
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
