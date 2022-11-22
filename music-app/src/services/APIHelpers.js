export const getJSON = (URI) => {
  const response = fetch(URI, {
    headers: {
      "content-type": "application/json",
      server: "uvicorn",
    },
  })
  return response;
};