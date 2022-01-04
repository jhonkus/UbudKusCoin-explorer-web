import { createSlice } from "@reduxjs/toolkit";

// interface Block {
//     Version: string,
//     Height: string,
//     TimeStamp: string,
//     PrevHash: string,
//     Hash: string,
//     Transactions: string,
//     Validator: string,
//     MerkleRoot: string,
//     NumOfTx: number,
//     TotalAmount: number,
//     TotalReward: number,
//     Difficulty: number
// }

const initialState = {
    blocks: []
};

export const name = 'blocks';

const blockSlice = createSlice({
    name,
    initialState,
    reducers: {
        saveBlocks(state, action) {
            return {
                ...state,
                blocks: action.payload,
            };
        }
    },
});

export const { saveBlocks } = blockSlice.actions;
export default blockSlice.reducer;