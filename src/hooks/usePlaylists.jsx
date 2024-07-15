import { useState, useEffect } from "react";
import { getPlayList } from "../api";
import storage from "../utils/Storage";

const usePlaylists = () => {
  const STORAGE_KEY = "youtube_playlist";
  const INIT_STATE = {
    playlists: {},
    recentPlaylists: [],
    favourites: [],
  };
  const [state, setState] = useState(
    storage.get(STORAGE_KEY) ? storage.get(STORAGE_KEY) : INIT_STATE
  );

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

  useEffect(() => {
    const data = storage.get(STORAGE_KEY);
    if (data) {
      setState({ ...data });
    }
  }, []);

  useEffect(() => {
    storage.save(STORAGE_KEY, state);
  }, [state]);

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
