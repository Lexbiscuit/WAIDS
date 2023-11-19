"use client";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function FullDetailsComponent({ flow_id }) {
  const { data, status, isFetching } = useQuery({
    queryKey: ["investigationId", flow_id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/investigation/${flow_id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (isFetching) return <h1>Loading...</h1>;
  if (status === "error") return <h1>Error fetching data</h1>;
  if (status === "success" && data && data.length === 0)
    return <h1>No data</h1>;
  if (status === "success" && data && data.length > 0) {
    return (
      <>
        {data.map((val) => (
          <Grid item border=".5px solid black" key={val._id}>
            <pre>{JSON.stringify(val, null, 2)}</pre>
          </Grid>
        ))}
      </>
    );
  }
}
