import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import usePlaylists from "../hooks/usePlaylists";

function RootLayout() {
  return (
    <>
      {/* <Navbar getItemsByPlaylistId={getItemsByPlaylistId} />
      <Container>
        <Outlet />
      </Container> */}
    </>
  );
}

export default RootLayout;
