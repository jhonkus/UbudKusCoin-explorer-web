import { createSlice } from "@reduxjs/toolkit";


const initialState = { total: 2 };

export const name = 'balance';

const balanceSlice = createSlice({
  name,
  initialState,
  reducers: {
    deposit(state, action) {
      return {
        ...state,
        total: state.total + action.payload,
      };
    },
    withdraw(state, action) {
      return {
        ...state,
        total: state.total - action.payload,
      };
    },
  },
});

export const { deposit, withdraw } = balanceSlice.actions;
export default balanceSlice.reducer;