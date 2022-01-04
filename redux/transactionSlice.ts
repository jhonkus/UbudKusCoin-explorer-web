import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: []
};

export const name = 'transactions';

const transactionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        saveTransactions(state, action) {
            return {
                ...state,
                transactions: action.payload,
            };
        },
    },
});

export const { saveTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;