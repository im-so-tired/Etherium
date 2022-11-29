export interface currency {
  currencyName: string;
  active: boolean;
}
export interface fieldGroup {
  title: string;
  state: {
    currency: currency[];
    name: string;
  };
  sort: boolean;
  active: boolean;
}
export interface field {
  title: string;
  state: string;
  sort: boolean;
  active: boolean;
}
export type fieldTable = fieldGroup | field;
export interface fieldStateGroup {
  main: boolean;
  currency: boolean[];
}
export type typeField = string | fieldGroup;
export interface payloadField {
  nameField: any;
  value: boolean;
}
export interface blockType {
  [key: string]: any;
  id: number;
  nomer: number;
  hash: string;
  time: string;
  countTrans: number;
  countCall: number;
  totalAmount: number[];
}
export interface IUser {
  id: string;
  email: string;
  phone: string;
  password: string;
}
