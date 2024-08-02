import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PlaylistForm from "./PlaylistForm";

export default function Navbar({ handleShowAlert }) {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

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
              handleShowAlert={handleShowAlert}
              inert
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
