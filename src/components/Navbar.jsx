import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddPlaylistModal from "./AddPlaylistModal";
import AddCustomPlaylistModal from "./AddCustomPlaylistModal";
import { Link } from "react-router-dom";

export default function Navbar({
  handleShowErrorAlert,
  handleShowSuccessAlert,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "purple" }}>
        <Toolbar>
          <Typography
            component={Link}
            to={`/`}
            variant="h6"
            sx={{ flexGrow: 1, my: 2, textDecoration: "none", color: "#fff" }}
          >
            Youtube Playlist
          </Typography>
          <AddPlaylistModal
            handleShowErrorAlert={handleShowErrorAlert}
            handleShowSuccessAlert={handleShowSuccessAlert}
          />
          <AddCustomPlaylistModal />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
