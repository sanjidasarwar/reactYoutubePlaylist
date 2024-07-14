import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { PlayCircleFilledOutlined } from "@mui/icons-material";

function PlaylistCard({ playlist }) {
  const { playlistTitle, channelTitle, thumbnails, playlistId } = playlist;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={thumbnails}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h5">{playlistTitle}</Typography>
        <Typography variant="body2" color="text.secondary">
          {channelTitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row">
          <PlayCircleFilledOutlined />
          <Typography variant="body2">Play Now</Typography>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default PlaylistCard;
