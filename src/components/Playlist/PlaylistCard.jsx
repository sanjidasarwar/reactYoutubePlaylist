import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { PlayCircleFilledOutlined } from "@mui/icons-material";

function PlaylistCard({ playlist }) {
  const { playlistTitle, channelTitle, playlistThumbnails, playlistId } =
    playlist;
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="194"
        image={playlistThumbnails.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h5">{playlistTitle}</Typography>
        <Typography variant="body2" color="text.secondary">
          {channelTitle}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}>
        <CardActions disableSpacing>
          <Stack direction="row">
            <PlayCircleFilledOutlined color="primary" />
            <Typography
              variant="body2"
              color="primary"
              sx={{ fontWeight: "bold", marginLeft: "5px", marginTop: "3px" }}
            >
              Play Now
            </Typography>
          </Stack>
        </CardActions>
      </Box>
    </Card>
  );
}

export default PlaylistCard;
