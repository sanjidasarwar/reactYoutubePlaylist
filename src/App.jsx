import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RootLayout from "./page/RootLayout";
import PlaylistPreview from "./page/PlaylistPreview";
import VideoPlaylist from "./page/VideoPlaylist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="PlaylistPreview/:playlistId" element={<PlaylistPreview />} />
      <Route path="VideoPlaylist/:playlistId" element={<VideoPlaylist />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111422",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
