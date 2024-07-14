import { useState } from "react";
import getPlayList from "../api";

const usePlaylists = () => {
  const [state, setState] = useState({
    playlists: {},
    recentPlaylists: [],
    favourites: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getVideosByPlaylistId = async (playlistsId, refresh = false) => {
    if (state.playlists[playlistsId] && !refresh) {
      return;
    }

    setLoading(true);

    let result;

    try {
      result = await getPlayList(playlistsId);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error?.message || "Something went wrong!!!");
    } finally {
      setLoading(false);
    }

    // let chnId, chnTitle;

    // result = result.map((item) => {
    //   const {
    //     channelId,
    //     title,
    //     description,
    //     channelTitle,
    //     thumbnails: { medium },
    //   } = item.snippet;

    //   if (!chnId) {
    //     chnId = channelId;
    //   }

    //   if (!chnTitle) {
    //     chnTitle = channelTitle;
    //   }

    //   return {
    //     title,
    //     description,
    //     thumbnails: medium,
    //     contentDetails: item.contentDetails,
    //   };
    // });

    setState((prev) => ({
      ...prev,
      playlists: {
        ...prev.playlists,
        [playlistsId]: {
          items: result,
          playlistsId: playlistsId,
        },
      },
    }));
  };

  const addToFavourites = (playlistsId) => {
    setState((prev) => ({
      ...prev,
      favourites: [...prev, playlistsId],
    }));
  };

  const addToRecent = (playlistsId) => {
    setState((prev) => ({
      ...prev,
      recentPlaylists: [...prev, playlistsId],
    }));
  };

  const getPlayListsByIds = (ids = []) => {
    return ids.map((id) => state.playlists[id]);
  };

  return {
    playlists: state.playlists,
    recentPlaylists: getPlayListsByIds(state.recentPlaylists),
    favourites: getPlayListsByIds(state.favourites),
    getVideosByPlaylistId,
    addToFavourites,
    addToRecent,
    loading,
    error,
  };
};

export default usePlaylists;
