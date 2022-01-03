import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  blocks: [],
  block: {},
  loading: false,
  error: false,
};

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    getBlocks: (state, action) => {
      state.blocks = action.payload;
      state.loading = true;
      state.error = false;
    },
    getBlock: (state, action) => {
      state.block = action.payload;
      state.loading = false;
      state.error = false;
    }
  },
});
export const { getBlocks, getBlock } = blockSlice.actions;
export default blockSlice.reducer;