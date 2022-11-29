// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fieldState, payloadField } from "../../types/interfaces";
// const activatedFields: fieldState = {
//   nomer: true,
//   hash: true,
//   time: true,
//   countTrans: true,
//   countCall: true,
//   totalAmount: {
//     main: true,
//     currency: [true, true],
//   },
// };

// type DNAFields = keyof typeof activatedFields;

// const fieldSlice = createSlice({
//   name: "fieldState",
//   initialState: activatedFields,
//   reducers: {
//     changeState(state: fieldState, action: PayloadAction<payloadField>) {
//       for (let key of Object.keys(state)) {
//         validateSequence(key);
//         if (key === action.payload.nameField) {
//           state[key] = action.payload.value;
//         }
//       }
//     },
//   },
// });
// export const { changeState } = fieldSlice.actions;
// export default fieldSlice.reducer;

// function validateSequence(values: string): asserts values is DNAFields {
//   if (!isValidCodon(values)) {
//     throw Error("invalid sequence");
//   }
// }
// function isValidCodon(value: string): value is DNAFields {
//   return value in activatedFields;
// }
export {};
