import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import PlaylistCard from "../Playlist/PlaylistCard";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  fetchCustomPlaylist,
  removeCustomPlaylist,
} from "../../features/customPlaylists/customPlaylistSlice";

function CustomPlaylists() {
  const { playlists } = useSelector((state) => state.customPlaylists);
  const playlistsArray = Object.values(playlists);
  const playlistsIdArray = Object.keys(playlists);

  const [selecedPlaylist, setSelectedPlaylist] = useState("");
  const [selecedVideoId, setSelectedVideoId] = useState("");

  const dispatch = useDispatch();

  const handleVideoChange = (e) => {
    const url = e.target.value;
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^&]+)/;
    const matches = url.match(regex);
    const id = matches ? matches[1] || matches[2] : null;
    setSelectedVideoId(id);
  };

  const handlePlaylistChange = (e) => {
    setSelectedPlaylist(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasInPlaylsit = playlists[selecedPlaylist].playlistItems.some(
      (item) => item.videoId === selecedVideoId
    );

    if (hasInPlaylsit) {
      alert("error");
    } else {
      dispatch(
        fetchCustomPlaylist({
          playlistId: selecedPlaylist,
          videoId: selecedVideoId,
        })
      );
      alert("success");
      setSelectedVideoId("");
      setSelectedPlaylist("");
    }
  };

  const handlePlaylistdelete = (id) => {
    dispatch(removeCustomPlaylist(id));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="videoLink"
          label="Video link"
          type="text"
          variant="filled"
          onChange={handleVideoChange}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Playlist
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={name}
            onChange={handlePlaylistChange}
          >
            {playlistsIdArray.map((id) => (
              <MenuItem value={id} key={id}>
                {playlists[id].playlistTitle}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit">Add</Button>
        </FormControl>
      </form>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {playlistsArray?.map((listItem) => (
          <Grid item xs={3} key={listItem.playlistId}>
            <PlaylistCard
              playlist={listItem}
              favouriteIcon={true}
              deleteIcon={true}
              handledelete={handlePlaylistdelete}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CustomPlaylists;
