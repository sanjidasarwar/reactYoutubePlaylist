import { useEffect } from "react";
import "./App.css";
import getPlayList from "./api";
import usePlaylists from "./hooks/usePlaylists";

function App() {
  const { getVideosByPlaylistId, playlists } = usePlaylists();
  useEffect(() => {
    getVideosByPlaylistId("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl");
  }, []);

  console.log("playlist", playlists);

  return <></>;
}

export default App;
