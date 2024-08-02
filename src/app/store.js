import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../features/playlists/playlistsSlice";
import favouriteReducer from "../features/favourites/favouritesSlice";

export default configureStore({
  reducer: {
    allPlaylistsData: playlistReducer,
    favouritePlaylists: favouriteReducer,
  },
});
