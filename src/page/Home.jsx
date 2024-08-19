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

  // const [showSucessAlert, setShowSuccessAlert] = useState(false);
  // const [showErrorAlert, setShowErrorAlert] = useState(false);

  // const handleCloseErrorAlert = () => {
  //   setShowErrorAlert(false);
  // };
  // const handleShowErrorAlert = () => {
  //   setShowErrorAlert(true);
  // };
  // const handleCloseSuccessAlert = () => {
  //   setShowSuccessAlert(false);
  // };
  // const handleShowSuccessAlert = () => {
  //   setShowSuccessAlert(true);
  // };

  return (
    <>
      {/* <Navbar
        handleShowErrorAlert={handleShowErrorAlert}
        handleShowSuccessAlert={handleShowSuccessAlert}
      /> */}
      <Container>
        <HomeTab />
        {/* {showErrorAlert && (
          <AlertBox
            type="error"
            handleClose={handleCloseErrorAlert}
            showAlert={showErrorAlert}
            message="This playlist is already in your playlists."
          />
        )}
        {showSucessAlert && (
          <AlertBox
            type="success"
            handleClose={handleCloseSuccessAlert}
            showAlert={showSucessAlert}
            message="Successfully added in your playlists."
          />
        )} */}
      </Container>
    </>
  );
}

export default Home;
