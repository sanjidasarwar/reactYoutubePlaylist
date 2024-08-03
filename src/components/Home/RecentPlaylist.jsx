import PlaylistCard from "../Playlist/PlaylistCard";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

function RecentPlaylist() {
  const { recent } = useSelector((state) => state.recentPlaylists);

  return (
    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
      {recent?.map((listItem) => (
        <Grid item xs={4} key={listItem.playlistId}>
          <PlaylistCard playlist={listItem} />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecentPlaylist;
