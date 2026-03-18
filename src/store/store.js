import { configureStore } from "@reduxjs/toolkit";
import noteRecuder from "../features/note/noteSlice"

export const store = configureStore({

    reducer: {
        note: noteRecuder
    }
    
})
export default store