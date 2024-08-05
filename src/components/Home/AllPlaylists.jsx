import Grid from "@mui/material/Grid";
import PlaylistCard from "../Playlist/PlaylistCard";
import { useDispatch, useSelector } from "react-redux";
import { removePlaylist } from "../../features/playlists/playlistsSlice";

function AllPlaylists() {
  const { playlists, isError } = useSelector((state) => state.allPlaylistsData);

  const playlistsArray = Object.values(playlists);

  const dispatch = useDispatch();

  const handlePlaylistdelete = (id) => {
    dispatch(removePlaylist(id));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {playlistsArray?.map((listItem) => (
          <Grid item xs={4} key={listItem.playlistId}>
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
