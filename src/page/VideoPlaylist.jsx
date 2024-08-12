import usePlaylists from "../hooks/usePlaylists";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlaylist/VideoPlayer";
import { useSelector } from "react-redux";

function VideoPlaylist() {
  const { playlistId } = useParams();
  // const { playlists, getItemsByPlaylistId } = usePlaylists();
  const [videoId, setVideoId] = useState("");
  const [items, setItems] = useState(null);
  const [channelName, setChannelName] = useState("");

  const { playlists } = useSelector((state) => state.allPlaylistsData);
  const { playlists: customPlaylists } = useSelector(
    (state) => state.customPlaylists
  );

  // const playlistItems = playlists[playlistId].playlistItems;
  // const { channelTitle } = playlists[playlistId];

  const handleVideoChange = (newVideoId) => {
    setVideoId(newVideoId);
  };

  // useEffect(() => {
  //   getItemsByPlaylistId(playlistId);
  // }, [playlistId, getItemsByPlaylistId]);

  useEffect(() => {
    if (playlists[playlistId]) {
      const playlistItems = playlists[playlistId].playlistItems;
      const { channelTitle: channelName } = playlists[playlistId];

      setVideoId(playlists[playlistId].playlistItems[0].videoId);
      setItems(playlistItems);
      setChannelName(channelName);
    } else if (customPlaylists[playlistId]) {
      setVideoId(customPlaylists[playlistId].playlistItems[0].videoId);
      const playlistItems = customPlaylists[playlistId].playlistItems;
      setItems(playlistItems);
    }
  }, [playlists, customPlaylists, playlistId]);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            {videoId && <VideoPlayer videoId={videoId} />}
          </Grid>
          <Grid item xs={5}>
            {items?.map((item) => (
              <PlaylistItem
                key={item.videoId}
                playlistItem={item}
                channelTitle={channelName}
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
