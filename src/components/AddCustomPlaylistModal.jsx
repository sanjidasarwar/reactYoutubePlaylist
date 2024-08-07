import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { addPlaylistName } from "../features/customPlaylists/customPlaylistSlice";
import AlertBox from "../components/AlertBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddCustomPlaylistModal() {
  const [open, setOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [showSucessAlert, setShowSuccessAlert] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setShowSuccessAlert(false);
  };

  const handleChange = (e) => {
    setPlaylistName(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(addPlaylistName(playlistName));
    setPlaylistName("");
    setShowSuccessAlert(true);
    handleCloseModal();
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpenModal}
        aria-hidden={false}
        sx={{ marginLeft: "15px" }}
      >
        Add Custom Playlist
      </Button>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Custom Playlist
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add a youtube video link to create your own palylist
          </Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="playistName"
            name="playistName"
            label="Playist Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <Stack direction="row" spacing={2}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      {showSucessAlert && (
        <AlertBox
          type="success"
          handleClose={setShowSuccessAlert(false)}
          showAlert={showSucessAlert}
          message="Successfully added in your playlists."
        />
      )}
    </>
  );
}

export default AddCustomPlaylistModal;
