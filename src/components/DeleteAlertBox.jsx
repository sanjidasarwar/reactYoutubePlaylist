import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function DeleteAlertBox({
  deleteAlert,
  closeDeleteAlert,
  handledelete,
  playlistId,
}) {
  return (
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
          onClick={() => handledelete(playlistId)}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAlertBox;
