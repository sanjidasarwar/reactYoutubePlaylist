import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import { PlayCircleFilledOutlined } from "@mui/icons-material";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
// import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites } from "../../features/favourites/favouritesSlice";
import { useState } from "react";
import AlertBox from "../AlertBox";
import DeleteAlertBox from "../DeleteAlertBox";
import { addToRecent } from "../../features/recent/recentSlice";
import DefaultImage from "../../assets/images/thumbnail.jpg";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function PlaylistCard({ playlist, favouriteIcon, deleteIcon, handledelete }) {
  const {
    playlistTitle,
    channelTitle,
    playlistThumbnails,
    playlistId,
    playlistItemNumber,
  } = playlist;

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
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "visible",
        }}
      >
        <CardMedia
          component="img"
          image={playlistThumbnails?.url || DefaultImage}
          alt={playlistTitle}
          sx={{
            border: "3px solid purple",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        />
        <CardContent
          sx={{
            textDecoration: "none",
            position: "absolute",
            top: "80%",
            left: "10px",
            width: "92%",
            borderTop: "3px solid gold",
            backgroundColor: "#fff",
            padding: "5px",
            color: "#000",
            "&:last-child": {
              paddingBottom: "0px",
            },
          }}
          onMouseDown={() => handleRecent(playlist)}
        >
          <Tooltip title={playlistTitle} arrow placement="top-start">
            <Typography
              variant="subtitle1"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2,
                lineHeight: 1.2,
                maxHeight: "2.4em",
                textDecoration: "none",
              }}
              component={Link}
              to={`PlaylistPreview/${playlistId}`}
            >
              {playlistTitle}
            </Typography>
          </Tooltip>
          <Stack direction="row" sx={{ marginTop: 1, marginBottom: "5px" }}>
            <Typography variant="body2" color="text.secondary">
              {channelTitle}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: "auto" }}
            >
              ({playlistItemNumber} videos)
            </Typography>
          </Stack>

          {/* <Box sx={{ flexGrow: 1 }}>
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
          </Box> */}
          <CardActions
            sx={{
              justifyContent: "center",
              borderTop: "2px solid #ddd",
              padding: 0,
            }}
          >
            <Tooltip title="View Full Playlist" placement="top" arrow>
              <IconButton component={Link} to={`PlaylistPreview/${playlistId}`}>
                <PlayCircleFilledWhiteOutlinedIcon color="warning" />
              </IconButton>
            </Tooltip>
            {favouriteIcon && (
              <Tooltip title="Add to Favourite" placement="top" arrow>
                <IconButton onClick={() => handleAddToFavourite(playlist)}>
                  <FavoriteBorderOutlinedIcon sx={{ color: "purple" }} />
                </IconButton>
              </Tooltip>
            )}
            {deleteIcon && (
              <Tooltip title="Remove Playlist" placement="top" arrow>
                <IconButton onClick={showDeleteAlert}>
                  <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        </CardContent>
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
