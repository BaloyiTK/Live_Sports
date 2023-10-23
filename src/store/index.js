import { createSlice, configureStore } from "@reduxjs/toolkit";

// Define the competitionNameSlice
const competitionNameSlice = createSlice({
  name: "competitionName",
  initialState: { name: "" },
  reducers: {
    setCompetitionName(state, action) {
      state.name = action.payload;
    },
  },
});

// Define the menuSlice
const menuSlice = createSlice({
  name: "menu",
  initialState: { isMenuOpen: false },
  reducers: {
    openMenu(state) {
      state.isMenuOpen = true;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

// Define the selectedTabSlice
const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState: "all", // Set the initial state to "all" or your desired default tab
  reducers: {
    setSelectedTab(state, action) {
      return action.payload;
    },
  },
});

// Export the actions for the competitionName, menu, and selectedTab slices
export const competitionNameActions = competitionNameSlice.actions;
export const menuActions = menuSlice.actions;
export const selectedTabActions = selectedTabSlice.actions;

export const store = configureStore({
  reducer: {
    competitionName: competitionNameSlice.reducer,
    menu: menuSlice.reducer,
    selectedTab: selectedTabSlice.reducer, // Include the selected tab slice in the Redux store
  },
});
