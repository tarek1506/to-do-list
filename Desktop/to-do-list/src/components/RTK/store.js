import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./slices/todo-slice";

export const store=configureStore({
    reducer:{
        todo:todoSliceReducer
    }
})
