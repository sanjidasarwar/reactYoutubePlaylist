import Grid from "@mui/material/Grid2";
import PlaylistCard from "../Playlist/PlaylistCard";
import { useDispatch, useSelector } from "react-redux";
import { removePlaylist } from "../../features/playlists/playlistsSlice";
import { removeFromFavourites } from "../../features/favourites/favouritesSlice";
import { removeFromRecent } from "../../features/recent/recentSlice";

function AllPlaylists() {
  const { playlists } = useSelector((state) => state.allPlaylistsData);

  const playlistsArray = Object.values(playlists);

  const dispatch = useDispatch();

  const handlePlaylistdelete = (id) => {
    dispatch(removePlaylist(id));
    dispatch(removeFromFavourites(id));
    dispatch(removeFromRecent(id));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {playlistsArray?.map((listItem) => (
          <Grid item xs={3} key={listItem.playlistId}>
            <PlaylistCard
              playlist={listItem}
              favouriteIcon={true}
              deleteIcon={true}
              handledelete={handlePlaylistdelete}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AllPlaylists;
