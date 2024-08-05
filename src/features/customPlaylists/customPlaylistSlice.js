import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: {},
};

export const customPlaylistSlice = createSlice({
  name: "customPlaylists",
  initialState,
  reducers: {
    addPlaylistName: (state, action) => {
      state.playlists[action.payload] = {
        playlistName: action.payload,
      };
    },
  },
});

export const { addPlaylistName } = customPlaylistSlice.actions;
export default customPlaylistSlice.reducer;
