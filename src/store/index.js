import { configureStore, createSlice } from "@reduxjs/toolkit";

const competitionNameSlice = createSlice({
  name: "competitionName",
  initialState: { name: "" },
  reducers: {
    setCompetitionName(state, action) {
      state.name = action.payload;
    },
  },
});

// Export the actions for the competitionName slice
export const competitionNameActions = competitionNameSlice.actions;

export const store = configureStore({
  reducer: {
 
    competitionName: competitionNameSlice.reducer, // Include the competitionName slice in the Redux store
  },
});
