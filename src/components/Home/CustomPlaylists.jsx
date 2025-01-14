import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import PlaylistCard from "../Playlist/PlaylistCard";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AlertBox from "../AlertBox";
import { useEffect, useState } from "react";
import {
  fetchCustomPlaylist,
  removeCustomPlaylist,
} from "../../features/customPlaylists/customPlaylistSlice";
import { removeFromFavourites } from "../../features/favourites/favouritesSlice";
import { removeFromRecent } from "../../features/recent/recentSlice";
import { Typography } from "@mui/material";

function CustomPlaylists() {
  const { playlists } = useSelector((state) => state.customPlaylists);
  const playlistsArray = Object.values(playlists);
  const playlistsIdArray = Object.keys(playlists);

  const [selecedPlaylist, setSelectedPlaylist] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showHelper, setShowHelper] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasInPlaylsit = playlists[selecedPlaylist].playlistItems.some(
      (item) => item.videoId === selectedVideoId
    );

    if (hasInPlaylsit) {
      setShowErrorAlert(true);
      return;
    }

    try {
      const fetchedPlaylist = await dispatch(
        fetchCustomPlaylist({
          playlistId: selecedPlaylist,
          videoId: selectedVideoId,
        })
      );

      if (fetchedPlaylist.error) {
        setShowHelper(true);
        return;
      }

      setShowSuccessAlert(true);
      setSelectedVideoId("");
      setSelectedPlaylist("");
    } catch (error) {
      console.error("An error occurred while fetching the playlist:", error);
      setShowHelper(true);
    }
  };

  const handlePlaylistdelete = (id) => {
    dispatch(removeCustomPlaylist(id));
    dispatch(removeFromFavourites(id));
    dispatch(removeFromRecent(id));
  };

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="videoLink"
          label="Video link"
          type="text"
          variant="standard"
          onChange={handleVideoChange}
        />
        <FormControl variant="standard" sx={{ mx: 2, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Playlist
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={name}
            onChange={handlePlaylistChange}
          >
            {playlistsIdArray.length > 0 ? (
              playlistsIdArray.map((id) => (
                <MenuItem value={id} key={id}>
                  {playlists[id]?.playlistTitle || "Untitled Playlist"}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                No playlist created
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 1,
            backgroundColor: "gold",
            color: "purple",
            "&:hover": { backgroundColor: "gold", color: "white" },
          }}
        >
          Add
        </Button>
      </form>
      {showHelper && (
        <Typography sx={{ color: "red", mt: 1 }}>
          Please Enter a vlaid video link
        </Typography>
      )}
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

      {showErrorAlert && (
        <AlertBox
          type="error"
          handleClose={handleCloseErrorAlert}
          showAlert={showErrorAlert}
          message="This video is already in your playlists."
        />
      )}
      {showSucessAlert && (
        <AlertBox
          type="success"
          handleClose={handleCloseSuccessAlert}
          showAlert={showSucessAlert}
          message="Successfully added in your playlists."
        />
      )}
    </>
  );
}

export default CustomPlaylists;
