import axios from "axios";

const key = import.meta.env.VITE_API_KEY;

const getPlayList = async (playlistId, pageToken = "", result = []) => {
  const { data } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet%2Cstatus&maxResults=100&pageToken=${pageToken}&playlistId=${playlistId}&key=${key}`
  );

  result = [...result, ...data.items];

  if (data.nextPageToken) {
    result = getPlayList(playlistId, data.nextPageToken, [...result]);
  }

  return result;
};

export default getPlayList;
