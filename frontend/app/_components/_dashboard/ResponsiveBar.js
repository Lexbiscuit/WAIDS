import { ResponsiveBar as NivoBar } from "@nivo/bar";
import * as React from "react";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ResponsiveBar = ({ id }) => {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchBarChartData", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/ResponsiveBar?id=${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 10000,
  });

  if (isFetching) {
    return <Typography>Loading...</Typography>;
  }
  if (status == "error") {
    return <Typography>An error occured...</Typography>;
  }
  if (status == "success") {
    return (
      <NivoBar
        data={data}
        groupMode="grouped"
        indexBy="id"
        margin={{ top: 30, right: 70, bottom: 70, left: 70 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }}
        colorBy="indexValue"
        axisBottom={false}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
      />
    );
  }
};

export default ResponsiveBar;