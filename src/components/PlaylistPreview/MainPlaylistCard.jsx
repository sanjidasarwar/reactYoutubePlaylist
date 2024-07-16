import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function MainPlaylistCard({ playlistInfo }) {
  const {
    playlistTitle,
    channelTitle,
    playlistThumbnails,
    playlistDescription,
  } = playlistInfo;

  return (
    <Card>
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
          <Button>
            <Stack direction="row">
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  marginLeft: "5px",
                  marginTop: "3px",
                }}
              >
                Play All
              </Typography>
            </Stack>
          </Button>
        </CardActions>
        <Typography variant="body2">{playlistDescription}</Typography>
      </Box>
    </Card>
  );
}

export default MainPlaylistCard;
