import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AlertBox({ handleClose, showAlert, message }) {
  return (
    <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertBox;
