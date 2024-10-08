import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function MainPlaylistCard({ playlistInfo }) {
  const { playlistId } = useParams();
  const { playlistTitle, channelTitle, playlistDescription } = playlistInfo;

  return (
    <Card sx={{ backgroundColor: "#1A1B2F", color: "white" }}>
      <CardContent>
        <Typography variant="h5">{playlistTitle}</Typography>
        {channelTitle && (
          <Typography variant="body2" color="text.secondary">
            {channelTitle}
          </Typography>
        )}
      </CardContent>
      <Box sx={{ flexGrow: 1 }}>
        <CardActions disableSpacing>
          <Button>
            <Stack
              direction="row"
              to={`/VideoPlaylist/${playlistId}`}
              component={Link}
              sx={{ textDecoration: "none" }}
            >
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
        {playlistDescription && (
          <Typography variant="body2" sx={{ padding: "20px" }}>
            {playlistDescription}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

export default MainPlaylistCard;
