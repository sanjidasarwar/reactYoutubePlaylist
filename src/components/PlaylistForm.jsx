import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../features/playlists/playlistsSlice";

export default function PlaylistForm({ open, handleClose, handleShowAlert }) {
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.allPlaylistsData);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!id) {
      alert("Please insert a playlist id or link");
    } else {
      if (playlists[id]) {
        handleShowAlert();
      } else {
        dispatch(fetchPlaylists(id));
        setId("");
        handleClose();
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new playlist please insert the playlist id or palylist link
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="playistId"
            name="playistId"
            label="Playist Id"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
