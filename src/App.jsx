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
    primary: {
      main: "#FFD700",
    },
    secondary: {
      main: "#4a4b6a",
    },
    background: {
      default: "#111422",
    },
    text: {
      secondary: "#8A89A6",
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#38394f",
          },
          "&.Mui-selected": {
            backgroundColor: "#4a4b6a",
            color: "gold",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#FFD700",
          },
        },
      },
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
