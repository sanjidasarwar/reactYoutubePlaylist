import Navbar from "../components/Navbar";
import PlaylistCard from "../components/Playlist/PlaylistCard";
import { Container, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import usePlaylists from "../hooks/usePlaylists";

function Home() {
  const { playlists, getItemsByPlaylistId, showAlert, closeAlert } =
    usePlaylists();

  const playlistsArray = Object.values(playlists);

  return (
    <>
      <Navbar getItemsByPlaylistId={getItemsByPlaylistId} />
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
            onClose={closeAlert}
          >
            You have added this playlist earlier
          </Alert>
        )}
      </Container>
    </>
  );
}

export default Home;
