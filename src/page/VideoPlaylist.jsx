import usePlaylists from "../hooks/usePlaylists";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useParams, useLocation } from "react-router-dom";
import VideoPlayer from "../components/VideoPlaylist/VideoPlayer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function VideoPlaylist() {
  const { playlistId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate(`${location.pathname}?videoId=${newVideoId}`);
    setVideoId(newVideoId);
  };

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialVideoId = queryParams.get("videoId");
    if (initialVideoId) {
      setVideoId(initialVideoId);
    }
  }, [location.search]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "30px",
        marginBottom: "30px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={7}>
          {videoId && <VideoPlayer videoId={videoId} />}
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            height: "calc(100vh - 100px)",
            overflowY: "scroll",
          }}
        >
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
  );
}

export default VideoPlaylist;
