import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CalendarType } from "@/types/settings";

type SettingsState = {
  calendarType: CalendarType;
};

const initialState: SettingsState = {
  calendarType: "gregorian",
};

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    setCalendarType(state, action: PayloadAction<CalendarType>) {
      state.calendarType = action.payload;
    },
  },
});

export const { setCalendarType } = settingsSlice.actions;

export default settingsSlice.reducer;