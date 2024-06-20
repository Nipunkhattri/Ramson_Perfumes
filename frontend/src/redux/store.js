import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./features/AuthSlice";
import { productReducer } from "./features/ProductSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only persist the 'auth' slice
}

const persistedReducer = persistReducer(persistConfig, authReducer);

export default configureStore({
    reducer: {
      persistedReducer,
      product:productReducer
    },
});
