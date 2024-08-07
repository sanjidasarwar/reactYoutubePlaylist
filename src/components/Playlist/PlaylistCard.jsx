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
import { addToFavourites } from "../../features/favourites/favouritesSlice";
import { useState } from "react";
import AlertBox from "../AlertBox";
import DeleteAlertBox from "../DeleteAlertBox";
import { addToRecent } from "../../features/recent/recentSlice";

function PlaylistCard({ playlist, favouriteIcon, deleteIcon, handledelete }) {
  const { playlistTitle, channelTitle, playlistThumbnails, playlistId } =
    playlist;

  const [successAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const { favourites } = useSelector((state) => state.favouritePlaylists);
  const { recent } = useSelector((state) => state.recentPlaylists);

  const dispatch = useDispatch();

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
      setShowErrorAlert(true);
    } else {
      dispatch(addToFavourites(favouritePlaylist));
      setSuccessAlert(true);
    }
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

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowErrorAlert(false);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessAlert(false);
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
          onMouseDown={() => handleRecent(playlist)}
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
              {favouriteIcon && (
                <FavoriteRoundedIcon
                  color="success"
                  onClick={() => handleAddToFavourite(playlist)}
                />
              )}
              {deleteIcon && (
                <RemoveCircleRoundedIcon
                  color="error"
                  onClick={showDeleteAlert}
                />
              )}
            </Stack>
          </CardActions>
        </Box>
      </Card>
      {showErrorAlert && (
        <AlertBox
          handleClose={handleErrorClose}
          showAlert={showErrorAlert}
          type="error"
          message="This playlist is already in your favourites."
        />
      )}
      {successAlert && (
        <AlertBox
          handleClose={handleSuccessClose}
          showAlert={successAlert}
          type="success"
          message="Successfully added in your favourites list."
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
