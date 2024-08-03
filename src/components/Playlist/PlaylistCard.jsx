import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { PlayCircleFilledOutlined } from "@mui/icons-material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removePlaylist } from "../../features/playlists/playlistsSlice";
import { addToFavourites } from "../../features/favourites/favouritesSlice";
import { useState } from "react";
import AlertBox from "../AlertBox";
import DeleteAlertBox from "../DeleteAlertBox";
import { addToRecent } from "../../features/recent/recentSlice";

function PlaylistCard({ playlist }) {
  const { playlistTitle, channelTitle, playlistThumbnails, playlistId } =
    playlist;

  const [showAlert, setShowAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const { favourites } = useSelector((state) => state.favouritePlaylists);
  const { recent } = useSelector((state) => state.recentPlaylists);

  const dispatch = useDispatch();

  const handledelete = (id) => {
    dispatch(removePlaylist(id));
  };

  const showDeleteAlert = () => {
    setDeleteAlert(true);
  };
  const closeDeleteAlert = () => {
    setDeleteAlert(false);
  };

  const handleAddToFavourite = (favouritePlaylist) => {
    const isInFavouriteList = favourites.some(
      (favourite) => favourite.playlistId === favouritePlaylist.playlistId
    );

    if (isInFavouriteList) {
      setShowAlert(true);
    } else {
      dispatch(addToFavourites(favouritePlaylist));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };

  const handleRecent = (recentplaylist) => {
    const isInRecentList = recent.some(
      (item) => item.playlistId === recentplaylist.playlistId
    );

    if (isInRecentList) {
      return;
    } else {
      dispatch(addToRecent(recentplaylist));
    }
  };

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          height="194"
          image={playlistThumbnails.url}
          alt={playlistTitle}
        />
        <CardContent
          to={`VideoPlaylist/${playlistId}`}
          component={Link}
          sx={{ textDecoration: "none" }}
          onClick={() => handleRecent(playlist)}
        >
          <Typography variant="h5">{playlistTitle}</Typography>
          <Typography variant="body2" color="text.secondary">
            {channelTitle}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <CardActions disableSpacing>
            <Button to={`PlaylistPreview/${playlistId}`} component={Link}>
              <Stack direction="row">
                <PlayCircleFilledOutlined color="primary" />
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    fontWeight: "bold",
                    marginLeft: "5px",
                    marginTop: "3px",
                  }}
                >
                  View Full Playlist
                </Typography>
              </Stack>
            </Button>
            <Stack direction="row">
              <FavoriteRoundedIcon
                color="success"
                onClick={() => handleAddToFavourite(playlist)}
              />
              <RemoveCircleRoundedIcon
                color="error"
                //onClick={() => handledelete(playlistId)}
                onClick={showDeleteAlert}
              />
            </Stack>
          </CardActions>
        </Box>
      </Card>
      {showAlert && (
        <AlertBox
          handleClose={handleClose}
          showAlert={showAlert}
          message="This playlist is already in your favourites."
        />
      )}
      {deleteAlert && (
        <DeleteAlertBox
          deleteAlert={deleteAlert}
          closeDeleteAlert={closeDeleteAlert}
          handledelete={handledelete}
          playlistId={playlistId}
        />
      )}
    </>
  );
}

export default PlaylistCard;
