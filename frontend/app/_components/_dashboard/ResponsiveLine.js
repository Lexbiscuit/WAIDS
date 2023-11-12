import { ResponsiveLine as NivoLine } from "@nivo/line";
import * as React from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ResponsiveLine = ({ timeCategory, chartCategory, matchValue }) => {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchLineChartData", timeCategory, chartCategory, matchValue],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/dashboard/ResponsiveLine?timeCategory=${timeCategory}&chartCategory=${chartCategory}&matchValue=${matchValue}`
      );
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
      <NivoLine
        data={[{ id: "x", data }]}
        margin={{ top: 30, right: 80, bottom: 100, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${timeCategory}`,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "intrusions",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        useMesh={true}
      />
    );
  }
};

export default ResponsiveLine;
