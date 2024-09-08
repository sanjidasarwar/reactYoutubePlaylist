import * as React from "react";
import Navbar from "../components/Navbar";
import { Container, Grid } from "@mui/material";
// import usePlaylists from "../hooks/usePlaylists";
import { useState, useEffect } from "react";
import AlertBox from "../components/AlertBox";
import HomeTab from "../components/Home/HomeTab";

function Home() {
  return (
    <>
      <HomeTab />
    </>
  );
}

export default Home;
