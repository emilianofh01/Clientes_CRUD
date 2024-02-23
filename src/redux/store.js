import { configureStore } from "@reduxjs/toolkit";
import clientReducer from './clientSlice';

export const store = configureStore({
    reducer: {
        user: clientReducer
    }
})

export default store;