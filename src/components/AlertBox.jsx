import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AlertBox({ handleClose, showAlert, message, type }) {
  return (
    <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertBox;
