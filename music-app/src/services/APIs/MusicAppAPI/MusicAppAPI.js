import { getJSON } from "../../APIHelpers";

const URI = "http://127.0.0.1:8000";

export const getSimple = async (token) => {
    const response = await getJSON(`${URI}/simple?token=${token}`);
    return response.json();
};