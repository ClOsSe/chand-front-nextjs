import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CalendarType, PriceColorType, ViewModelType } from "@/types/settings";

const loadSelectedTokenKeys = (): string[] => {
  try {
    const saved = localStorage.getItem("selectedTokenKeys");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

type SettingsState = {
  calendarType: CalendarType;
  viewModel: ViewModelType;
  priceColor: PriceColorType;
  selectedTokenKeys: string[];
};

const initialState: SettingsState = {
  calendarType: "gregorian",
  viewModel: "cardView",
  priceColor: "red",
  selectedTokenKeys: loadSelectedTokenKeys(),
};

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    setCalendarType(state, action: PayloadAction<CalendarType>) {
      state.calendarType = action.payload;
    },
    setViewModelType(state, action: PayloadAction<ViewModelType>) {
      state.viewModel = action.payload;
    },
    setPriceColorType(state, action: PayloadAction<PriceColorType>) {
      state.priceColor = action.payload;
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

export const { clearSelectedTokens, setCalendarType,setViewModelType,setPriceColorType, toggleSelectedToken } =
  settingsSlice.actions;

export default settingsSlice.reducer;
