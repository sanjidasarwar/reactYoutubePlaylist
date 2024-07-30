import usePlaylists from "../hooks/usePlaylists";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlaylist/VideoPlayer";

function VideoPlaylist() {
  const { playlistId } = useParams();
  const { playlists, getItemsByPlaylistId } = usePlaylists();
  const [videoId, setVideoId] = useState("");

  const playlistItems = playlists[playlistId].playlistItems;
  const { channelTitle } = playlists[playlistId];
  console.log(playlistItems);

  const handleVideoChange = (newVideoId) => {
    setVideoId(newVideoId);
  };

  useEffect(() => {
    getItemsByPlaylistId(playlistId);
  }, [playlistId, getItemsByPlaylistId]);

  useEffect(() => {
    if (playlists[playlistId]) {
      setVideoId(playlists[playlistId].playlistItems[0].contentDetails.videoId);
    }
  }, [playlists, playlistId]);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            {videoId && <VideoPlayer videoId={videoId} />}
          </Grid>
          <Grid item xs={5}>
            {playlistItems.map((item) => (
              <PlaylistItem
                key={item.contentDetails.videoId}
                playlistItem={item}
                channelTitle={channelTitle}
                handleVideoChange={handleVideoChange}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default VideoPlaylist;
