import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideoDetails } from "../../api";
import storage from "../../utils/Storage";

const STORAGE_KEY = "custom_playlist";

const initialState = {
  playlists: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchCustomPlaylist = createAsyncThunk(
  "customPlaylist/fetchCustomPlaylist",
  async (payload) => {
    const customPlaylist = await getVideoDetails(payload.videoId);
    const playlistId = payload.playlistId;

    return {
      customPlaylist,
      playlistId,
    };
  }
);

export const customPlaylistSlice = createSlice({
  name: "customPlaylists",
  initialState: storage.get(STORAGE_KEY)
    ? storage.get(STORAGE_KEY)
    : initialState,
  reducers: {
    addPlaylistName: (state, action) => {
      state.playlists[action.payload.playlistId] = {
        playlistId: action.payload.playlistId,
        playlistTitle: action.payload.playistName,
        playlistItems: [],
      };
    },
    removeCustomPlaylist: (state, action) => {
      delete state.playlists[action.payload];
      storage.save(STORAGE_KEY, state);
    },
    removePlaylistItem: (state, action) => {
      const { playlistId, videoId } = action.payload;
      const playlist = state.playlists[playlistId];

      if (playlist) {
        playlist.playlistItems = playlist.playlistItems.filter(
          (item) => item.videoId !== videoId
        );
      }

      storage.save(STORAGE_KEY, state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomPlaylist.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchCustomPlaylist.fulfilled, (state, action) => {
      state.isLoading = true;

      state.playlists[action.payload.playlistId].playlistItems.push(
        action.payload.customPlaylist
      );
      storage.save(STORAGE_KEY, state);
    });
    builder.addCase(fetchCustomPlaylist.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.error?.message;
    });
  },
});

export const {
  addPlaylistName,
  addPlaylistVideo,
  removeCustomPlaylist,
  removePlaylistItem,
} = customPlaylistSlice.actions;
export default customPlaylistSlice.reducer;
