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
const loadSelectedViewModel = (): ViewModelType => {
  try {
    const saved = localStorage.getItem("SelectedViewModel");
    return saved ? JSON.parse(saved) : 'listView';
  } catch {
    return "listView";
  }
};
const loadSelectedPriceColor = (): PriceColorType => {
  try {
    const saved = localStorage.getItem("SelectedPriceColor");
    return saved ? JSON.parse(saved) : 'red';
  } catch {
    return "red";
  }
};
const loadSelectedCalendarType = (): CalendarType => {
  try {
    const saved = localStorage.getItem("SelectedCalendarType");
    return saved ? JSON.parse(saved) : 'gregorian';
  } catch {
    return "gregorian";
  }
};

type SettingsState = {
  calendarType: CalendarType;
  viewModel: ViewModelType;
  priceColor: PriceColorType;
  selectedTokenKeys: string[];
};

const initialState: SettingsState = {
  calendarType: loadSelectedCalendarType(),
  viewModel: loadSelectedViewModel(),
  priceColor: loadSelectedPriceColor(),
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
