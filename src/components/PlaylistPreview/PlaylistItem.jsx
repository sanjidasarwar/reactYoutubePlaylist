import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function PlaylistItem({ playlistItem, channelTitle, handleVideoChange }) {
  console.log(playlistItem);

  const { thumbnails, title, videoId } = playlistItem;
  // const videoId = playlistItem.contentDetails.videoId || playlistItem.videoId;
  return (
    <Box sx={{ display: "flex", marginBottom: "20px" }}>
      <img
        src={thumbnails}
        alt=""
        height="90"
        width="160"
        style={{ cursor: "pointer" }}
        onClick={() => handleVideoChange(videoId)}
      />
      <Box sx={{ marginLeft: "20px" }}>
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => handleVideoChange(videoId)}
        >
          {title} | {channelTitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default PlaylistItem;
