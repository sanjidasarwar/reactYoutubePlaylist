import { useParams } from "react-router-dom";
// import usePlaylists from "../hooks/usePlaylists";
// import { useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import MainPlaylistCard from "../components/PlaylistPreview/MainPlaylistCard";
// import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useSelector } from "react-redux";

function Playlist() {
  const { playlistName } = useParams();

  const { playlists } = useSelector((state) => state.customPlaylists);
  const playlistItems = playlists[playlistId].playlistItems;

  console.log(playlists);

  return (
    <>
      {/* <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <MainPlaylistCard playlistInfo={playlists[playlistId]} />
            </Grid>
            <Grid item xs={7}>
              {playlistItems.map((item) => (
                <PlaylistItem
                  key={item.contentDetails.videoId}
                  playlistItem={item}
                  channelTitle={channelTitle}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container> */}
    </>
  );
}

export default Playlist;
