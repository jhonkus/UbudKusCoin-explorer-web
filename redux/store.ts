import { configureStore } from '@reduxjs/toolkit';
import blockReducer from './blockSlice';
import transactionReducer from './transactionSlice';

export default configureStore({
  reducer: {
    blocks: blockReducer,
    transactions: transactionReducer
  }
});
