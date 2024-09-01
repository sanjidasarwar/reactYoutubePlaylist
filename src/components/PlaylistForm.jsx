import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../features/playlists/playlistsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

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

export default function PlaylistForm({
  open,
  handleCloseModal,
  handleShowErrorAlert,
  handleShowSuccessAlert,
  showEmptyMessage,
  handleShowEmptyMessage,
  handleCloseEmptyMessage,
  handleShowErrorMessage,
  handleCloseErrorMessage,
  showErrorMessage,
}) {
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.allPlaylistsData);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const match = inputValue.match(/[?&]list=([a-zA-Z0-9_-]+)/);

    match ? setId(match[1]) : setId(inputValue);

    handleCloseEmptyMessage();
    handleCloseErrorMessage();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!id) {
      handleShowEmptyMessage();
    } else {
      if (playlists[id]) {
        handleShowErrorAlert();
        handleCloseModal();
      } else {
        dispatch(fetchPlaylists(id));
        if (!showErrorMessage) {
          handleShowErrorMessage();
          return;
        } else {
          setId("");
          handleCloseModal();
          handleShowSuccessAlert();
        }
      }
    }
  };

  return (
    // <Modal
    //   open={open}
    //   onClose={handleCloseModal}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box sx={style}>
    //     <Typography id="modal-modal-title" variant="h6" component="h2">
    //       Youtube Playlist
    //     </Typography>
    //     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //       Add a youtube playlist id or link
    //     </Typography>
    //     <TextField
    //       autoFocus
    //       required
    //       margin="dense"
    //       id="playistId"
    //       name="playistId"
    //       label="Playist Id"
    //       type="text"
    //       fullWidth
    //       variant="standard"
    //       onChange={(e) => handleChange(e)}
    //     />
    //     {showEmptyMessage && (
    //       <Typography id="modal-modal-description" sx={{ color: "red" }}>
    //         Please insert a playlist id or link
    //       </Typography>
    //     )}
    //     {showErrorMessage && (
    //       <Typography id="modal-modal-description" sx={{ color: "red" }}>
    //         Please insert a valid playlist id or link
    //       </Typography>
    //     )}
    //     <Stack direction="row" spacing={2}>
    //       <Button onClick={handleCloseModal}>Cancel</Button>
    //       <Button type="submit" onClick={handleSubmit}>
    //         Add
    //       </Button>
    //     </Stack>
    //   </Box>
    // </Modal>
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
          overflow: "hidden", // to avoid overflow issues with rounded corners
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "purple",
            color: "white",
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Youtube Playlist
          </Typography>
        </Box>

        {/* Modal Content */}
        <Box sx={{ padding: 3 }}>
          <Typography id="modal-modal-description">
            Add a YouTube playlist ID or link
          </Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="playlistId"
            name="playlistId"
            label="Playlist ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
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
          {showEmptyMessage && (
            <Typography sx={{ color: "red" }}>
              Please insert a playlist ID or link
            </Typography>
          )}
          {showErrorMessage && (
            <Typography sx={{ color: "red" }}>
              Please insert a valid playlist ID or link
            </Typography>
          )}
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
  );
}
