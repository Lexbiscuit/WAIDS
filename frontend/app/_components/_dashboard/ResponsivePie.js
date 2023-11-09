"use client";
import { ResponsivePie as NivoPie } from "@nivo/pie";
import { Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ResponsivePie = ({ id }) => {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchPieChartData", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/ResponsivePie?id=${id}`);
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
      <NivoPie
        data={data}
        colors={{ scheme: "category10" }}
        margin={{ top: 30, right: 70, bottom: 70, left: 70 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        fit={true}
      />
    );
  }
};

export default ResponsivePie;
