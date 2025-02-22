import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylistName } from "../features/customPlaylists/customPlaylistSlice";
import { updateTab } from "../features/tab/tabSlice";
import AlertBox from "../components/AlertBox";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function AddCustomPlaylistModal() {
  const [open, setOpen] = useState(false);
  const [playlistNameObj, setPlaylistNameObj] = useState({});
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.customPlaylists);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setPlaylistNameObj({
      [e.target.name]: e.target.value,
      playlistId: uid.rnd(),
    });
  };
  const handleSubmit = () => {
    const isDuplicate = Object.values(playlists).some(
      (playlist) => playlist.playlistTitle === playlistNameObj.playlistName
    );

    if (isDuplicate) {
      setShowErrorAlert(true);
      return;
    }

    dispatch(addPlaylistName(playlistNameObj));
    dispatch(updateTab(3));
    setShowSuccessAlert(true);
    handleCloseModal();
  };

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpenModal}
        aria-hidden={false}
        sx={{
          backgroundColor: "gold",
          color: "purple",
          "&:hover": { backgroundColor: "gold", color: "white" },
          marginLeft: "15px",
        }}
      >
        Add Custom Playlist
      </Button>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            maxWidth: 400,
            mx: "auto",
            mt: 10,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundColor: "purple",
              color: "white",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Custom Playlist
            </Typography>
          </Box>

          <Box sx={{ padding: 3 }}>
            <Typography
              id="modal-modal-description"
              sx={{ color: "secondary.main" }}
            >
              Add a YouTube video link to create your own playlist
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="playlistName"
              name="playlistName"
              label="Playlist Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              sx={{
                input: { color: "purple" },
                "& .MuiInputLabel-root": { color: "purple" },
                "& .MuiInput-underline:before": { borderBottomColor: "purple" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "purple",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "purple" },
              }}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: "#c62828",
                  color: "white",
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#FFD700",
                  color: "white",
                  "&:hover": { backgroundColor: "#FFC300" },
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

      {showErrorAlert && (
        <AlertBox
          type="error"
          handleClose={handleCloseErrorAlert}
          showAlert={showErrorAlert}
          message="Playlist name already exists. Please choose a different name."
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

export default AddCustomPlaylistModal;
