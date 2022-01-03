import { createSlice } from "@reduxjs/toolkit";

interface BlockModel {
    Version: string,
    Height: string,
    TimeStamp: string,
    PrevHash: string,
    Hash: string,
    Transactions: string,
    Validator: string,
    MerkleRoot: string,
    NumOfTx: number,
    TotalAmount: number,
    TotalReward: number,
    Difficulty: number
}

const block: BlockModel = {
    Version: "",
    Height: "",
    TimeStamp: "",
    PrevHash: "",
    Hash: "",
    Transactions: "",
    Validator: "",
    MerkleRoot: "",
    NumOfTx: 0,
    TotalAmount: 0,
    TotalReward: 0,
    Difficulty: 0
}

const initialState = {
    current: block
};

export const name = 'block';

const blockSlice = createSlice({
    name,
    initialState,
    reducers: {
        currentBlock(state, action) {
            return {
                ...state,
                current: action.payload,
            };
        },
    },
});

export const { currentBlock } = blockSlice.actions;
export default blockSlice.reducer;