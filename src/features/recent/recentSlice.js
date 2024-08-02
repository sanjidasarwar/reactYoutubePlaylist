import { createSlice } from "@reduxjs/toolkit";
import storage from "../../utils/Storage";

const STORAGE_KEY = "recent_playlist";

const initialState = {
  recent: [],
};

export const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    addToRecent: (state, action) => {
      state.recent.unshift(action.payload);
      state.recent = state.recent.slice(0, 5);
      storage.save(STORAGE_KEY, state);
    },
  },
});

export const { addToRecent } = recentSlice.actions;
export default recentSlice.reducer;
