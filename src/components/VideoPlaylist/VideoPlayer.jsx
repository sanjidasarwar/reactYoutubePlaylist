import YouTube from "react-youtube";

function VideoPlayer({ videoId }) {
  //   const opts = {
  //     height: "390",
  //     width: "640",
  //     playerVars: {
  //       autoplay: 1,
  //     },
  //   };

  return (
    // <YouTube videoId={videoId} opts={opts} />
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export default VideoPlayer;
