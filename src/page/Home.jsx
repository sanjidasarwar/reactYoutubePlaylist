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
      <HomeTab />
    </>
  );
}

export default Home;
