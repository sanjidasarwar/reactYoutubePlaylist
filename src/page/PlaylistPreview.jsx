import { useNavigate, useParams } from "react-router-dom";
import usePlaylists from "../hooks/usePlaylists";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MainPlaylistCard from "../components/PlaylistPreview/MainPlaylistCard";
import PlaylistItem from "../components/PlaylistPreview/PlaylistItem";
import { useSelector } from "react-redux";

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
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <MainPlaylistCard playlistInfo={playlistInfo} />
            </Grid>
            <Grid item xs={7}>
              {items.map((item) => (
                <PlaylistItem
                  playlistId={playlistId}
                  key={item.videoId}
                  playlistItem={item}
                  channelTitle={channelName}
                  handleVideoChange={handleVideoChange}
                  deleteIcon={showDeleteIcon}
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
