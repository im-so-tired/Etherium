import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fieldTable,
  payloadField,
  field,
  fieldGroup,
  fieldStateGroup,
} from "../../types/interfaces";
interface sortedFieldGroup {
  sortedName: string;
  currencyName: string;
}
interface payloadFieldGroup {
  fieldName: string;
  value: fieldStateGroup;
}
interface IFields {
  [key: string]: any;
  fieldInfo: fieldTable[];
  sortedField: string | sortedFieldGroup;
}
const fields: IFields = {
  fieldInfo: [
    { title: "Номер", state: "nomer", sort: true, active: true },
    { title: "Хеш", state: "hash", sort: false, active: true },
    { title: "Время", state: "time", sort: false, active: true },
    {
      title: "Количество транзакций",
      state: "countTrans",
      sort: true,
      active: true,
    },
    {
      title: "Количество вызовов",
      state: "countCall",
      sort: true,
      active: true,
    },
    {
      title: "Общая сумма",
      sort: true,
      state: {
        currency: [
          { currencyName: "ETH", active: true },
          { currencyName: "USD", active: true },
        ],
        name: "totalAmount",
      },
      active: true,
    },
  ],
  sortedField: "nomer",
};
const filterReducer = createSlice({
  name: "filter-reducer",
  initialState: fields,
  reducers: {
    changeState(state: any, action: PayloadAction<payloadField>) {
      state.fieldInfo = state.fieldInfo.map((item: fieldTable) => {
        let nameState = "";
        if (typeof item.state === "string") {
          nameState = item.state;
        }
        if (nameState === action.payload.nameField) {
          return { ...item, active: action.payload.value };
        } else {
          return item;
        }
      });
    },
    changeSortedFieldGroup(
      state: IFields,
      action: PayloadAction<sortedFieldGroup>
    ) {
      state.sortedField = {
        sortedName: action.payload.sortedName,
        currencyName: action.payload.currencyName,
      };
    },
    changeSortedField(state: IFields, action: PayloadAction<string>) {
      state.sortedField = action.payload;
    },
    changeStateGroup(state: IFields, action: PayloadAction<payloadFieldGroup>) {
      const newArray = state.fieldInfo.map((item: any) => {
        if (action.payload.fieldName === item.state.name) {
          item.state.active = action.payload.value.main;
          item.state.currency.map((currency: any, index: number) => {
            currency.active = action.payload.value.currency[index];
          });
        }
        return item;
      });
      state.fieldInfo = [...newArray];
    },
  },
});

export default filterReducer.reducer;
export const {
  changeState,
  changeSortedField,
  changeSortedFieldGroup,
  changeStateGroup,
} = filterReducer.actions;
function instanceOfField(object: any): object is field {
  return (
    "title" in object &&
    "sort" in object &&
    "state" in object &&
    "active" in object
  );
}
function instanceOfFieldGroup(object: any): object is fieldGroup {
  return (
    "title" in object &&
    "sort" in object &&
    "state" in object &&
    "active" in object
  );
}
function instanceOfFieldStateGroup(object: any): object is fieldStateGroup {
  return "main" in object && "currency" in object;
}
