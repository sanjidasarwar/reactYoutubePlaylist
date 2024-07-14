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

  const { title, thumbnails, channelTitle } = data.items[0].snippet;

  return {
    playlistTitle: title,
    thumbnails: thumbnails.medium.url,
    channelTitle,
  };
};

export default getPlayListItem;
