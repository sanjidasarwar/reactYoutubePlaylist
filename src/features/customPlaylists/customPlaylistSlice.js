import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideoDetails } from "../../api";

const initialState = {
  playlists: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchCustomPlaylist = createAsyncThunk(
  "customPlaylist/fetchCustomPlaylist",
  async (payload) => {
    const customPlaylist = await getVideoDetails(payload.link);
    const playlistTitle = payload.playlistTitle;

    return {
      customPlaylist,
      playlistTitle,
    };
  }
);

export const customPlaylistSlice = createSlice({
  name: "customPlaylists",
  initialState,
  reducers: {
    addPlaylistName: (state, action) => {
      state.playlists[action.payload] = {
        playlistTitle: action.payload,
        playlistItem: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomPlaylist.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchCustomPlaylist.fulfilled, (state, action) => {
      state.isLoading = true;
      console.log(action);

      state.playlists[action.payload.playlistTitle].playlistItem.push(
        action.payload.customPlaylist
      );
    });
    builder.addCase(fetchCustomPlaylist.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.error?.message;
    });
  },
});

export const { addPlaylistName, addPlaylistVideo } =
  customPlaylistSlice.actions;
export default customPlaylistSlice.reducer;
