import { useParams } from "react-router-dom";
import usePlaylists from "../hooks/usePlaylists";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MainPlaylistCard from "../components/PlaylistPreview/MainPlaylistCard";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";

function Playlist() {
  const { playlistId } = useParams();
  const { playlists, getItemsByPlaylistId } = usePlaylists();

  const playlistItems = playlists[playlistId].playlistItems;
  const { channelTitle } = playlists[playlistId];

  useEffect(() => {
    getItemsByPlaylistId(playlistId);
  }, []);

  console.log(playlists[playlistId]);
  return (
    <>
      <Container>
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
      </Container>
    </>
  );
}

export default Playlist;
