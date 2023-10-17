export const getData = async (url) => {
  const response = await fetch(`/api/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};
