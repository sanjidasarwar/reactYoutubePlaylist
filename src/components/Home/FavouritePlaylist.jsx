import PlaylistCard from "../Playlist/PlaylistCard";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

function FavouritePlaylist() {
  const { favourites } = useSelector((state) => state.favouritePlaylists);
  return (
    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
      {favourites?.map((listItem) => (
        <Grid item xs={4} key={listItem.playlistId}>
          <PlaylistCard playlist={listItem} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FavouritePlaylist;
