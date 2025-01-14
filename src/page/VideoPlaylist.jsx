import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useParams, useLocation } from "react-router-dom";
import VideoPlayer from "../components/VideoPlaylist/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVideoTime as addYoutubePlaylistVideoTime } from "../features/playlists/playlistsSlice";
import { addVideoTime as addCustomPlaylistVideoTime } from "../features/customPlaylists/customPlaylistSlice";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

function VideoPlaylist() {
  const { playlistId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [videoId, setVideoId] = useState("");
  const [allItems, setItems] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [playlistType, setPlaylistType] = useState("");
  const [videoTime, setVideoTime] = useState(0);
  const [videoPauseTime, setVideoPauseTime] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const totalVideos = allItems ? allItems.length : 0;
  const currentVideoIndex =
    allItems?.findIndex((item) => item.videoId === videoId) + 1;

  const { playlists } = useSelector((state) => state.allPlaylistsData);
  const { playlists: customPlaylists } = useSelector(
    (state) => state.customPlaylists
  );

  const dispatch = useDispatch();

  const updateVideoPauseTime = (playlist, videoId) => {
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
      updateVideoPauseTime(playlists[playlistId], newVideoId);
    } else if (playlistType === "custom-Playlist") {
      dispatch(
        addCustomPlaylistVideoTime({
          playlistId: playlistId,
          videoId: videoId,
          videoTime,
        })
      );
      updateVideoPauseTime(customPlaylists[playlistId], newVideoId);
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
        // flexGrow: 1,
        marginTop: "30px",
        marginBottom: "30px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid
          item
          size={{ xs: "grow", md: 6 }}
          offset={{ md: 10 }}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography>
            Playing {currentVideoIndex}/{totalVideos}
          </Typography>
          {/* <Button variant="contained" sx={{ mt: 2 }}> */}
          {showPlaylist ? (
            <PlaylistRemoveIcon
              onClick={() => setShowPlaylist(false)}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <PlaylistPlayIcon
              onClick={() => setShowPlaylist(true)}
              sx={{ cursor: "pointer" }}
            />
          )}
          {/* </Button> */}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item size={showPlaylist ? 7 : 12}>
          {videoId && (
            <VideoPlayer
              videoId={videoId}
              handleVideoTime={handleVideoTime}
              videoPauseTime={videoPauseTime}
            />
          )}
        </Grid>
        {showPlaylist && (
          <Grid
            item
            size={5}
            sx={{
              height: "calc(100vh - 100px)",
              overflowY: "scroll",
            }}
          >
            {allItems?.map((item, index) => (
              <PlaylistItem
                key={item.videoId}
                playlistItem={item}
                channelTitle={channelName}
                handleVideoChange={handleVideoChange}
                isActive={item.videoId === videoId}
                index={index}
              />
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default VideoPlaylist;
