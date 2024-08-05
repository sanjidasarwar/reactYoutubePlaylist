import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PlaylistForm from "./PlaylistForm";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../features/playlists/playlistsSlice";

export default function Navbar({
  handleShowErrorAlert,
  handleShowSuccessAlert,
}) {
  const [open, setOpen] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  console.log(showErrorMessage);

  const { isError } = useSelector((state) => state.allPlaylistsData);
  const dispatch = useDispatch();

  const handleShowEmptyMessage = () => {
    setShowEmptyMessage(true);
    setShowErrorMessage(false);
  };

  const handleCloseEmptyMessage = () => {
    setShowEmptyMessage(false);
    dispatch(clearError());
  };

  const handleShowErrorMessage = () => {
    setShowErrorMessage(true);
  };
  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleCloseEmptyMessage();
    handleCloseErrorMessage();
  };

  useEffect(() => {
    setShowErrorMessage(isError);
  }, [isError]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              Youtube Playlist
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenModal}
              aria-hidden={false}
            >
              Add Playlist
            </Button>
            <PlaylistForm
              open={open}
              handleCloseModal={handleCloseModal}
              handleShowErrorAlert={handleShowErrorAlert}
              handleShowSuccessAlert={handleShowSuccessAlert}
              handleShowEmptyMessage={handleShowEmptyMessage}
              handleCloseEmptyMessage={handleCloseEmptyMessage}
              showEmptyMessage={showEmptyMessage}
              handleShowErrorMessage={handleShowErrorMessage}
              handleCloseErrorMessage={handleCloseErrorMessage}
              showErrorMessage={showErrorMessage}
              inert
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
