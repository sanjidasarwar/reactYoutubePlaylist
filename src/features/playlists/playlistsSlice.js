import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlayList } from "../../api";
import storage from "../../utils/Storage";

const STORAGE_KEY = "youtube_playlist";

const initialState = {
  playlists: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async (payload) => {
    const playlist = await getPlayList(payload);
    return playlist;
  }
);

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState: storage.get(STORAGE_KEY)
    ? storage.get(STORAGE_KEY)
    : initialState,
  reducers: {
    removePlaylist: (state, action) => {
      delete state.playlists[action.payload];
      storage.save(STORAGE_KEY, state);
    },
    clearError: (state) => {
      state.isError = false;
    },
    addVideoTime: (state, action) => {
      state.playlists[action.payload.playlistId].playlistItems.map((item) => {
        if (item.videoId === action.payload.videoId) {
          item.videoPausTime = action.payload.videoPauseTime;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylists.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.isLoading = true;
      state.playlists[action.payload.playlistId] = action.payload;
      storage.save(STORAGE_KEY, state);
    });
    builder.addCase(fetchPlaylists.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.error?.message;
    });
  },
});

export const { removePlaylist, clearError, addVideoTime } =
  playlistsSlice.actions;

export default playlistsSlice.reducer;
