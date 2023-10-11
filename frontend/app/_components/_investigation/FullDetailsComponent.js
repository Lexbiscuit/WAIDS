"use client";
import { useState, useEffect } from "react";
import { getData } from "@/app/_utils/getData";
import { getData_id } from "@/app/_utils/getData_id";
import { Grid } from "@mui/material";

export default function FullDetailsComponent({ id }) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const { flow_id } = await getData_id("logviewer/" + id);
    await getData("investigation/flow_id?flow_id=" + flow_id).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data &&
        data.map((val) => (
          <Grid item xs={12} md={6} lg={4} border="1px solid black">
            <pre>{JSON.stringify(val, null, 2)}</pre>
          </Grid>
        ))}
    </>
  );
}
