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
import { useDispatch } from "react-redux";
import { removePlaylist } from "../../features/playlists/playlistsSlice";

function PlaylistCard({ playlist }) {
  const { playlistTitle, channelTitle, playlistThumbnails, playlistId } =
    playlist;

  const dispatch = useDispatch();

  const handledelete = (id) => {
    console.log(dispatch(removePlaylist(id)));
  };

  return (
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
                sx={{ fontWeight: "bold", marginLeft: "5px", marginTop: "3px" }}
              >
                View Full Playlist
              </Typography>
            </Stack>
          </Button>
          <Stack direction="row">
            <FavoriteRoundedIcon color="success" />
            <RemoveCircleRoundedIcon
              color="error"
              onClick={() => handledelete(playlistId)}
            />
          </Stack>
        </CardActions>
      </Box>
    </Card>
  );
}

export default PlaylistCard;
