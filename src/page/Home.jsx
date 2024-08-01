import Navbar from "../components/Navbar";
import PlaylistCard from "../components/Playlist/PlaylistCard";
import { Container, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
// import usePlaylists from "../hooks/usePlaylists";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Home() {
  // const { playlists, getItemsByPlaylistId, showAlert, closeAlert } =
  //   usePlaylists();

  const [showAlert, setShowAlert] = useState(false);

  const { playlists } = useSelector((state) => state.allPlaylistsData);

  const playlistsArray = Object.values(playlists);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = () => {
    setShowAlert(true);
  };

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
      <Navbar handleShowAlert={handleShowAlert} />
      <Container>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {playlistsArray?.map((listItem) => (
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
            onClose={handleCloseAlert}
          >
            You have added this playlist earlier
          </Alert>
        )}
      </Container>
    </>
  );
}

export default Home;
