import YouTube from "react-youtube";

function VideoPlayer({ videoId, handleVideoTime, videoPauseTime = 0 }) {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      start: videoPauseTime,
    },
  };

  const handleStateChange = (e) => {
    const pausedTime = e.target.getCurrentTime();
    const totalDuration = e.target.getDuration();

    if (totalDuration - pausedTime <= 120) {
      handleVideoTime(0);
    } else {
      handleVideoTime(pausedTime);
    }
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onStateChange={(e) => handleStateChange(e)}
    />
    // <iframe
    //   width="100%"
    //   height="100%"
    //   src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    //   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    //   allowFullScreen
    // ></iframe>
  );
}

export default VideoPlayer;
