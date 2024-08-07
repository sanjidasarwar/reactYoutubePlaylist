import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import PlaylistCard from "../Playlist/PlaylistCard";
import CustomPlaylistCard from "../CustomPlaylist/CustomPlaylistCard";

function CustomPlaylists() {
  const { playlists } = useSelector((state) => state.customPlaylists);
  const playlistsArray = Object.values(playlists);

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {playlistsArray?.map((listItem) => (
          <Grid item xs={4} key={listItem.playlistId}>
            <CustomPlaylistCard playlist={listItem} />
            {/* <PlaylistCard
              playlist={listItem}
              favouriteIcon={true}
              deleteIcon={true}
              //handledelete={handlePlaylistdelete}
            /> */}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CustomPlaylists;
