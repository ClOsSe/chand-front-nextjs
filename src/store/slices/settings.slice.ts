import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CalendarType } from "@/types/settings";

type SettingsState = {
  calendarType: CalendarType;
  selectedTokenKeys: string[];
};

const initialState: SettingsState = {
  calendarType: "gregorian",
  selectedTokenKeys: [],
};

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    setCalendarType(state, action: PayloadAction<CalendarType>) {
      state.calendarType = action.payload;
    },
    toggleSelectedToken(state, action: PayloadAction<string>) {
      const tokenKey = action.payload;
      const tokenIndex = state.selectedTokenKeys.indexOf(tokenKey);

      if (tokenIndex >= 0) {
        state.selectedTokenKeys.splice(tokenIndex, 1);
        return;
      }

      state.selectedTokenKeys.push(tokenKey);
    },
    clearSelectedTokens(state) {
      state.selectedTokenKeys = [];
    },
  },
});

export const { clearSelectedTokens, setCalendarType, toggleSelectedToken } =
  settingsSlice.actions;

export default settingsSlice.reducer;
