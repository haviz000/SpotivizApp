import axios from "axios";
import config from "./config";


export const getUsersTop5Artists = async(accessToken) => {

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  const res =  await axios.get(`${config.SPOTIFY_BASE_URL}/me/top/artists?limit=9&time_range=long_term`, {headers})

  return res.data.items;
}

export const getUsersTop5Tracks = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
  const res =  await axios.get(`${config.SPOTIFY_BASE_URL}/me/top/tracks?limit=9&time_range=long_term&limit=4`, {headers})
  return res.data.items;
}

export const getRecentlyPlayed = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
 const res = await axios.get(`${config.SPOTIFY_BASE_URL}/me/player/recently-played?limit=10`, { headers })
  return res.data.items
}

export const getPlaylists = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
  const res = await axios.get(`${config.SPOTIFY_BASE_URL}/me/playlists`, {headers})
  return res.data.items
}

export const getUserProfile = async (accessToken) => {
  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const endPoint = `${config.SPOTIFY_BASE_URL}/me`;
  const response = await axios.get(endPoint, requestOptions);

  return response.data;
}

export const searchTrack = async (query, accessToken) => {
  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(
    `${config.SPOTIFY_BASE_URL}/search?type=track&q=${query}`,
    requestOptions
  );

  return response;
};

export const createPlaylist = async (
  accessToken,
  userId,
  { name, description }
) => {
  const data = JSON.stringify({
    name,
    description,
    public: false,
    collaborative: false,
  });

  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`,
    data,
    requestOptions
  );

  return response.data;
};

export const addToPlaylist = async (accessToken, playlistId, uris) => {
  const data = JSON.stringify({
    uris,
  });

  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${config.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    data,
    requestOptions
  );

  return response.data;
};