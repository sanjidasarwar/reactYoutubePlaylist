import { useState, useEffect } from "react";
import { getPlayList } from "../api";

const usePlaylists = () => {
  const [state, setState] = useState({
    playlists: {},
    recentPlaylists: [],
    favourites: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const closeAlert = () => {
    setShowAlert(false);
  };

  const getItemsByPlaylistId = async (playlistsId, refresh = false) => {
    if (state.playlists[playlistsId] && !refresh) {
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      const playlist = await getPlayList(playlistsId);
      setError("");
      setState((prev) => ({
        ...prev,
        playlists: {
          ...prev.playlists,
          [playlistsId]: playlist,
        },
      }));
    } catch (err) {
      setError(err.response?.data?.error?.message || "Something went wrong!!!");
    } finally {
      setLoading(false);
    }
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
    getItemsByPlaylistId,
    addToFavourites,
    addToRecent,
    loading,
    error,
    showAlert,
    closeAlert,
  };
};

export default usePlaylists;
