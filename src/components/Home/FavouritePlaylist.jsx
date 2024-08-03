import PlaylistCard from "../Playlist/PlaylistCard";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourites } from "../../features/favourites/favouritesSlice";

function FavouritePlaylist() {
  const { favourites } = useSelector((state) => state.favouritePlaylists);

  const dispatch = useDispatch();

  const handleFavouritedelete = (id) => {
    dispatch(removeFromFavourites(id));
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
      {favourites?.map((listItem) => (
        <Grid item xs={4} key={listItem.playlistId}>
          <PlaylistCard
            playlist={listItem}
            deleteIcon={true}
            handledelete={handleFavouritedelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default FavouritePlaylist;
