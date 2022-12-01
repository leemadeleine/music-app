import { getJSON } from "../../APIHelpers";

const URI = "http://127.0.0.1:8000";

export const getSimple = async (token) => {
  const response = await getJSON(`${URI}/simple?token=${token}`);
  return response.json();
};

export const getOembed = async (src) => {
  const response = await fetch(`https://open.spotify.com/oembed?url=${src}`);
  return response.json();
};

export const getRecommendations = async (token, mood) => {
  const response = await getJSON(
    `${URI}/simple/recommendations?token=${token}&mood=${mood}`
  );
  return response.json();
};
