import usePlaylists from "../hooks/usePlaylists";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useParams, useLocation } from "react-router-dom";
import VideoPlayer from "../components/VideoPlaylist/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVideoTime as addYoutubePlaylistVideoTime } from "../features/playlists/playlistsSlice";
import { addVideoTime as addCustomPlaylistVideoTime } from "../features/customPlaylists/customPlaylistSlice";

function VideoPlaylist() {
  const { playlistId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [videoId, setVideoId] = useState("");
  const [items, setItems] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [playlistType, setPlaylistType] = useState("");
  const [videoTime, setVideoTime] = useState(0);
  const [videoPauseTime, setVideoPauseTime] = useState(0);

  const { playlists } = useSelector((state) => state.allPlaylistsData);
  const { playlists: customPlaylists } = useSelector(
    (state) => state.customPlaylists
  );

  const dispatch = useDispatch();

  const updateVideoPauseTIme = (playlist, videoId) => {
    // playlist.playlistItems.map((item) => {
    //   if (item.videoId === videoId) {
    //     setVideoPauseTime(item.videoTime);
    //   }
    // });
    const pausedItem = playlist.playlistItems.find(
      (item) => item.videoId === videoId
    );
    setVideoPauseTime(pausedItem ? pausedItem.videoTime : 0);
  };

  const handleVideoChange = (newVideoId) => {
    if (playlistType === "youtube-Playlist") {
      dispatch(
        addYoutubePlaylistVideoTime({
          playlistId,
          videoId,
          videoTime,
        })
      );
      updateVideoPauseTIme(playlists[playlistId], newVideoId);
      // playlists[playlistId].playlistItems.map((item) => {
      //   if (item.videoId === newVideoId) {
      //     setVideoPauseTime(item.videoTime);
      //   }
      // });
    } else if (playlistType === "custom-Playlist") {
      dispatch(
        addCustomPlaylistVideoTime({
          playlistId: playlistId,
          videoId: videoId,
          videoTime,
        })
      );
      updateVideoPauseTIme(customPlaylists[playlistId], newVideoId);

      // customPlaylists[playlistId].playlistItems.map((item) => {
      //   if (item.videoId === newVideoId) {
      //     setVideoPauseTime(item.videoTime);
      //   }
      // });
    }
    navigate(`${location.pathname}?videoId=${newVideoId}`);
    setVideoId(newVideoId);
  };

  const handleVideoTime = (time) => {
    setVideoTime(time);
  };

  useEffect(() => {
    const selectedPlaylists =
      playlists[playlistId] || customPlaylists[playlistId];
    if (selectedPlaylists) {
      const playlistItems = selectedPlaylists.playlistItems;
      setItems(playlistItems);
      setVideoId(playlistItems[0].videoId);
      setChannelName(selectedPlaylists.channelTitle || "");
      setPlaylistType(
        playlists[playlistId] ? "youtube-Playlist" : "custom-Playlist"
      );
    }
    // if (playlists[playlistId]) {
    //   const playlistItems = playlists[playlistId].playlistItems;
    //   const { channelTitle: channelName } = playlists[playlistId];

    //   setVideoId(playlists[playlistId].playlistItems[0].videoId);
    //   setItems(playlistItems);
    //   setChannelName(channelName);
    //   setPlaylistType("youtube-Playlist");
    // } else if (customPlaylists[playlistId]) {
    //   setVideoId(customPlaylists[playlistId].playlistItems[0].videoId);
    //   const playlistItems = customPlaylists[playlistId].playlistItems;
    //   setItems(playlistItems);
    //   setPlaylistType("custom-Playlist");
    // }
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
          {videoId && (
            <VideoPlayer
              videoId={videoId}
              handleVideoTime={handleVideoTime}
              videoPauseTime={videoPauseTime}
            />
          )}
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
              isActive={item.videoId === videoId}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default VideoPlaylist;
