import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (fovourite) => fovourite.playlistId === action.payload
      );
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
