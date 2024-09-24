import { Card, Stack } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAlertBox from "../DeleteAlertBox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Button from "@mui/material/Button";
import { useState } from "react";
import { removePlaylistItem } from "../../features/customPlaylists/customPlaylistSlice";
import { useDispatch } from "react-redux";

function PlaylistItem({
  playlistId,
  playlistItem,
  channelTitle,
  handleVideoChange,
  deleteIcon,
  isActive,
  index,
}) {
  const { thumbnails, title, videoId } = playlistItem;
  const [deleteAlert, setDeleteAlert] = useState(false);

  const dispatch = useDispatch();

  const showDeleteAlert = () => {
    setDeleteAlert(true);
  };
  const closeDeleteAlert = () => {
    setDeleteAlert(false);
  };

  const handlePlaylistItemdelete = (playlistId, videoId) => {
    dispatch(removePlaylistItem({ playlistId: playlistId, videoId: videoId }));
  };
  return (
    <Stack direction="row" spacing={1} sx={{ marginBottom: "10px" }}>
      <ArrowRightIcon
        sx={{
          color: isActive ? "gold" : "transparent",
          fontSize: "40px",
          alignSelf: "center",
        }}
      />
      <Typography sx={{ alignSelf: "center" }}>{index + 1}</Typography>
      <Box
        sx={{
          display: "flex",
          marginBottom: "10px",
          boxShadow: isActive ? "2px 2px 3px #000" : "inherit",
        }}
      >
        <img
          src={thumbnails}
          alt=""
          height="90"
          width="160"
          style={{ cursor: "pointer" }}
          onClick={() => handleVideoChange(videoId)}
        />
        <Box
          sx={{
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => handleVideoChange(videoId)}
          >
            {title} | {channelTitle}
          </Typography>
          {deleteIcon && <DeleteIcon color="error" onClick={showDeleteAlert} />}
        </Box>
      </Box>
      {deleteAlert && (
        <Dialog open={deleteAlert} onClose={closeDeleteAlert}>
          <DialogTitle>{"Delete Playlist"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this playlist?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteAlert} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handlePlaylistItemdelete(playlistId, videoId)}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
}

export default PlaylistItem;
