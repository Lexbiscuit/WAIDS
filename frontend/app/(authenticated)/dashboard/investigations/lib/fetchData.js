export const fetchData = async () => {
  const response = await fetch("/api/investigations/fetchData");
  const data = await response.json();
  return data;
};
