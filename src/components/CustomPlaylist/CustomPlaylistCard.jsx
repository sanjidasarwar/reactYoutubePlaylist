import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { PlayCircleFilledOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/images/thumbnail.jpg";

function CustomPlaylistCard({ playlist }) {
  const { playlistTitle } = playlist;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="194"
        image={thumbnail}
        alt={playlistTitle}
      />
      <CardContent to={``} component={Link} sx={{ textDecoration: "none" }}>
        <Typography variant="h5">{playlistTitle}</Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}>
        <CardActions disableSpacing>
          <Button to={`PlaylistPreview/${playlistTitle}`} component={Link}>
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
            <FavoriteRoundedIcon color="success" />
            <RemoveCircleRoundedIcon color="error" />
          </Stack>
        </CardActions>
      </Box>
    </Card>
  );
}

export default CustomPlaylistCard;
