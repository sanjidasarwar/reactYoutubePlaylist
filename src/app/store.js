import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../features/playlists/playlistsSlice";
import favouriteReducer from "../features/favourites/favouritesSlice";
import recentReducer from "../features/recent/recentSlice";

export default configureStore({
  reducer: {
    allPlaylistsData: playlistReducer,
    favouritePlaylists: favouriteReducer,
    recentPlaylists: recentReducer,
  },
});
