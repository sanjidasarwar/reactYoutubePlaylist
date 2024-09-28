import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  activeTab: 0,
};
export const tabSlice = createSlice({
  name: "tab",
  initialState: InitialState,
  reducers: {
    updateTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { updateTab } = tabSlice.actions;
export default tabSlice.reducer;
