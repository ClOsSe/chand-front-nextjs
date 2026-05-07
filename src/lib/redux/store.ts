import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "@/features/theme/store/app-slice";
import { themeReducer } from "@/features/theme/store/theme-slice";

export const store = configureStore({
  reducer:{
    app:appReducer,
    theme: themeReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch