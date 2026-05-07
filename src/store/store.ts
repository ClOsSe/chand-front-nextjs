import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "@/features/theme/store/app-slice";
import settingsReducer from "./slices/settings.slice";

export const store = configureStore({
  reducer:{
    app:appReducer,
    settings: settingsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch