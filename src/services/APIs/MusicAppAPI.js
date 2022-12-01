import { getJSON } from "../../APIHelpers";

const URI = "http://127.0.0.1:8000";

export const getRecommendations = async (token, mood) => {
  const response = await getJSON(
    `${URI}/simple/recommendations?token=${token}&mood=${mood}`
  );
  return response.json();
};
