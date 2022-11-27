import { getJSON } from "../../APIHelpers";

const URI = "http://127.0.0.1:8000";

export const getClientCredentials = async () => {
  const response = await getJSON(`${URI}/credentials`);
  return response.json();
};

export const getToken = async (code) => {
    const response = await getJSON(`${URI}/token?code=${code}`);
    return response.json();
}
