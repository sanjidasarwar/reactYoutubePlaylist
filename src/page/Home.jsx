import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PlaylistCard from "../components/Playlist/PlaylistCard";
import { Container, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";

import { getPlayList } from "../api";

function Home() {
  const [playlistId, setPlaylistId] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const getPlaylistId = (id) => {
    setPlaylistId(id);
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!playlist.some((item) => item.playlistId === playlistId)) {
        const playlistData = await getPlayList(playlistId);
        setPlaylist((prev) => [
          ...prev,
          {
            ...playlistData,
            playlistId,
          },
        ]);
      } else {
        setShowAlert(true);
      }
    };
    fetchPlaylist();
  }, [playlistId]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      <Navbar getPlaylistId={getPlaylistId} />
      <Container>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {playlist.map((listItem) => (
            <Grid item xs={4} key={listItem.playlistId}>
              <PlaylistCard playlist={listItem} />
            </Grid>
          ))}
        </Grid>
        {showAlert && (
          <Alert
            variant="filled"
            severity="info"
            sx={{ position: "absolute", right: "10px", top: "100px" }}
            onClose={() => {
              setShowAlert(false);
            }}
          >
            You have added this playlist earlier
          </Alert>
        )}
      </Container>
    </>
  );
}

export default Home;
