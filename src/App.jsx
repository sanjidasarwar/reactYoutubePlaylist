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
import RootLayout from "./page/RootLayout";
import PlaylistPreview from "./page/PlaylistPreview";
import VideoPlaylist from "./page/VideoPlaylist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="PlaylistPreview/:playlistId" element={<PlaylistPreview />} />
      <Route path="VideoPlaylist/:playlistId" element={<VideoPlaylist />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
