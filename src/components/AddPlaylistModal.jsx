import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PlaylistForm from "./PlaylistForm";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../features/playlists/playlistsSlice";

function AddPlaylistModal({ handleShowSuccessAlert, handleShowErrorAlert }) {
  const [open, setOpen] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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
    <>
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
    </>
  );
}

export default AddPlaylistModal;
