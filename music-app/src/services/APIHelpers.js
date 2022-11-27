export const getJSON = (URI, headers, extra) => {
  const response = fetch(URI, {
    headers: {
      "content-type": "application/json",
      server: "uvicorn",
      ...headers,
    },
    ...extra
  })
  return response;
};