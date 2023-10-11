export const getData_id = async (url) => {
  const response = await fetch(`http://localhost:3000/api/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};
