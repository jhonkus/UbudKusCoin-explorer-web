import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './balanceSlice';
import blockReducer from './blockSlice';

export default configureStore({
  reducer: {
    balance: balanceReducer,
    block: blockReducer
  }
});
