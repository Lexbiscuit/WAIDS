"use client";
import { useEffect, useState } from "react";

const FetchJoke = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming");
        setData(await response.json());
      } catch (error) {
        // console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {data == null && <p>Loading...</p>}
      {data != null &&
        data.setup &&
        data.delivery &&
        `${data.setup} ${data.delivery}`}
      {data != null && data.joke && `${data.joke}`}
    </>
  );
};

export default FetchJoke;
