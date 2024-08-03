import * as React from "react";
import Navbar from "../components/Navbar";
import { Container, Grid } from "@mui/material";
// import usePlaylists from "../hooks/usePlaylists";
import { useState, useEffect } from "react";
import AlertBox from "../components/AlertBox";
import HomeTab from "../components/Home/HomeTab";

function Home() {
  // const { playlists, getItemsByPlaylistId, showAlert, closeAlert } =
  //   usePlaylists();

  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  return (
    <>
      <Navbar handleShowAlert={handleShowAlert} />
      <Container>
        <HomeTab />
        {showAlert && (
          <AlertBox
            handleClose={handleCloseAlert}
            showAlert={showAlert}
            message="This playlist is already in your playlists."
          />
        )}
      </Container>
    </>
  );
}

export default Home;
