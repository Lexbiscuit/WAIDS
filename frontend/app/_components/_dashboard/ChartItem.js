import { Box, Grid } from "@mui/material";
import React, { cloneElement } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import ResponsiveBar from "./ResponsiveBar";
import ResponsiveLine from "./ResponsiveLine";
import ResponsivePie from "./ResponsivePie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Title from "./Title";
import axios from "axios";

const ChartItem = ({
  timeCategory,
  timeframe,
  chartType,
  chartCategory,
  matchValue,
  idx,
}) => {
  let Chart = null;
  const chartRef = React.useRef(null);
  const queryClient = useQueryClient();

  const removeChart = useMutation({
    mutationFn: async () => {
      return axios.post("/api/dashboard/RemoveChart", { chartIdx: idx });
    },
    onSuccess: () => queryClient.invalidateQueries(["fetchCharts"]),
  });

  if (chartType == "pie")
    Chart = (
      <ResponsivePie timeframe={timeframe} chartCategory={chartCategory} />
    );
  else if (chartType == "bar")
    Chart = (
      <ResponsiveBar timeframe={timeframe} chartCategory={chartCategory} />
    );
  else if (chartType == "line")
    Chart = (
      <ResponsiveLine
        timeCategory={timeCategory}
        chartCategory={chartCategory}
        matchValue={matchValue}
      />
    );
  let title;
  if (chartType == "pie" || chartType == "bar") {
    title = `${chartCategory} - ${timeframe}`;
  } else {
    title = `${timeCategory} - ${matchKey} - ${matchValue}`;
  }
  return (
    <Grid item xs={12} lg={6}>
      <Box height={"30rem"} border={"1px solid"} p={1} ref={chartRef}>
        <Title>{chartCategory ? chartCategory : timeCategory}</Title>
        <input
          type="button"
          value="download"
          onClick={() => exportComponentAsPNG(chartRef)}
        />
        <input
          type="button"
          value="delete"
          onClick={() => {
            removeChart.mutate();
          }}
        />

        {Chart}
      </Box>
    </Grid>
  );
};

export default ChartItem;
