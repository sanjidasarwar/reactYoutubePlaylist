import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../features/playlists/playlistsSlice";

export default configureStore({
  reducer: {
    allPlaylistsData: playlistReducer,
  },
});
