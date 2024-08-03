import { createSlice } from "@reduxjs/toolkit";
import storage from "../../utils/Storage";

const STORAGE_KEY = "favourite_playlist";

const initialState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: storage.get(STORAGE_KEY)
    ? storage.get(STORAGE_KEY)
    : initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.favourites.push(action.payload);
      storage.save(STORAGE_KEY, state);
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (fovourite) => fovourite.playlistId !== action.payload
      );
      storage.save(STORAGE_KEY, state);
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
