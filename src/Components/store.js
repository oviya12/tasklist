import { configureStore } from "@reduxjs/toolkit";
import taskslice from './taskslice'
export const store= configureStore({
    reducer:{
        task:taskslice
    }
})