"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function FullDetailsComponent({ id }) {
  const { data, status, isFetching } = useQuery({
    queryKey: ["investigationId", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/logviewer/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (isFetching) return <h1>Loading...</h1>;
  if (status === "error") return <h1>Error fetching data</h1>;
  if (status === "success") {
    return (
      <div style={{ border: "1px solid black" }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}
