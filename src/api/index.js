import axios from "axios";

const key = import.meta.env.VITE_API_KEY;

const getPlayListItem = async (playlistId, pageToken = "", result = []) => {
  const { data } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet%2Cstatus&maxResults=100&pageToken=${pageToken}&playlistId=${playlistId}&key=${key}`
  );

  result = [...result, ...data.items];

  if (data.nextPageToken) {
    result = getPlayListItem(playlistId, data.nextPageToken, [...result]);
  }

  return result;
};

export const getPlayList = async (playlistId) => {
  const { data } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`
  );
  const {
    thumbnails,
    channelTitle,
    channelId,
    title: playlistTitle,
    description: playlistDescription,
  } = data.items[0].snippet;

  let playlistItems = await getPlayListItem(playlistId);

  playlistItems = playlistItems.map((item) => {
    const { id } = item;
    const {
      title,
      description,
      thumbnails: { medium },
    } = item.snippet;

    return {
      id,
      title,
      description,
      thumbnails: medium.url,
      contentDetails: item.contentDetails,
      videoId: item.contentDetails.videoId,
    };
  });

  return {
    playlistId,
    playlistTitle,
    playlistDescription,
    playlistThumbnails: thumbnails.medium,
    channelTitle,
    channelId,
    playlistItems,
  };
};

// export const getYouTubeVideoId = (url) => {
//   const regex =
//     /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^&]+)/;
//   const matches = url.match(regex);
//   return matches ? matches[1] || matches[2] : null;
// };

export const getVideoDetails = async (videoId) => {
  // const videoId = getYouTubeVideoId(url);
  const video = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${key}`;

  try {
    const response = await axios.get(video);
    const id = response.data.items[0].id;
    const videoData = response.data.items[0].snippet;
    const { title, channelTitle, thumbnails } = videoData;
    const thumbnailUrl = thumbnails.medium.url;

    return {
      videoId: id,
      title,
      channelTitle,
      thumbnails: thumbnailUrl,
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
};

// export default getPlayList;
