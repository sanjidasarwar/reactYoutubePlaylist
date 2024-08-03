import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import PlaylistCard from "../Playlist/PlaylistCard";

function AllPlaylists() {
  const { playlists } = useSelector((state) => state.allPlaylistsData);

  const playlistsArray = Object.values(playlists);

  return (
    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
      {playlistsArray?.map((listItem) => (
        <Grid item xs={4} key={listItem.playlistId}>
          <PlaylistCard playlist={listItem} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AllPlaylists;
