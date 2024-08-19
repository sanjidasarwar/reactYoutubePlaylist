import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import AlertBox from "../components/AlertBox";

function RootLayout() {
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };
  const handleShowErrorAlert = () => {
    setShowErrorAlert(true);
  };
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };
  const handleShowSuccessAlert = () => {
    setShowSuccessAlert(true);
  };

  return (
    <>
      <Navbar
        handleShowErrorAlert={handleShowErrorAlert}
        handleShowSuccessAlert={handleShowSuccessAlert}
      />
      <Container>
        <Outlet />
        {showErrorAlert && (
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
        )}
      </Container>
    </>
  );
}

export default RootLayout;
