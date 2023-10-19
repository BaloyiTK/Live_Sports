import { configureStore, createSlice } from "@reduxjs/toolkit";

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

// Export the actions for the competitionName and menu slices
export const competitionNameActions = competitionNameSlice.actions;
export const menuActions = menuSlice.actions;

export const store = configureStore({
  reducer: {
    competitionName: competitionNameSlice.reducer,
    menu: menuSlice.reducer, // Include the menu slice in the Redux store
  },
});
