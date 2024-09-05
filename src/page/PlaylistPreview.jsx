import { useNavigate, useParams } from "react-router-dom";
import usePlaylists from "../hooks/usePlaylists";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MainPlaylistCard from "../components/PlaylistPreview/MainPlaylistCard";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useSelector } from "react-redux";
import DefaultImg from "../assets/images/thumbnail.jpg";
import { Stack, Typography } from "@mui/material";

function Playlist() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  // const { playlists, getItemsByPlaylistId } = usePlaylists();

  const { playlists } = useSelector((state) => state.allPlaylistsData);

  const { playlists: customPlaylists } = useSelector(
    (state) => state.customPlaylists
  );

  const [items, setItems] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [showDeleteIcon, setDeleteIcon] = useState(false);

  const handleVideoChange = (videoId) => {
    navigate(`/VideoPlaylist/${playlistId}?videoId=${videoId}`);
  };

  useEffect(() => {
    if (playlists[playlistId]) {
      const playlistItems = playlists[playlistId].playlistItems;
      const { channelTitle: channelName } = playlists[playlistId];
      const {
        playlistTitle,
        channelTitle,
        playlistThumbnails,
        playlistDescription,
      } = playlists[playlistId];

      setItems(playlistItems);
      setChannelName(channelName);
      setPlaylistInfo({
        playlistTitle,
        channelTitle,
        playlistThumbnails,
        playlistDescription,
      });
    } else if (customPlaylists[playlistId]) {
      const playlistItems = customPlaylists[playlistId].playlistItems;
      const { playlistTitle } = customPlaylists[playlistId];

      setItems(playlistItems);
      setChannelName(channelName);
      setPlaylistInfo({ playlistTitle });
      setDeleteIcon(true);
    }
  }, [playlistId, playlists, customPlaylists, items]);

  if (!items || items.length === 0) {
    return <p>Loading...</p>;
  }
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
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={5}>
          <img
            src={playlistInfo.playlistThumbnails?.url || DefaultImg}
            alt={playlistInfo.playlistTitle}
            width="100%"
            height="100%"
          />
        </Grid>
        <Grid item xs={7} height="300px" sx={{ overflowY: "scroll" }}>
          {items.map((item) => (
            <PlaylistItem
              key={item.videoId}
              playlistId={playlistId}
              playlistItem={item}
              channelTitle={channelName}
              handleVideoChange={handleVideoChange}
              deleteIcon={showDeleteIcon}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} height="300px" sx={{ overflowY: "scroll" }}>
          <MainPlaylistCard playlistInfo={playlistInfo} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Playlist;
