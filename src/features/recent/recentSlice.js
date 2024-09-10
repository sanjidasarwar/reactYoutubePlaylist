import { createSlice } from "@reduxjs/toolkit";
import storage from "../../utils/Storage";

const STORAGE_KEY = "recent_playlist";

const initialState = {
  recent: [],
};

export const recentSlice = createSlice({
  name: "recent",
  initialState: storage.get(STORAGE_KEY)
    ? storage.get(STORAGE_KEY)
    : initialState,
  reducers: {
    addToRecent: (state, action) => {
      state.recent.unshift(action.payload);
      state.recent = state.recent.slice(0, 5);
      storage.save(STORAGE_KEY, state);
    },
    removeFromRecent: (state, action) => {
      state.recent = state.recent.filter(
        (item) => item.playlistId !== action.payload
      );
      storage.save(STORAGE_KEY, state);
    },
  },
});

export const { addToRecent, removeFromRecent } = recentSlice.actions;
export default recentSlice.reducer;
