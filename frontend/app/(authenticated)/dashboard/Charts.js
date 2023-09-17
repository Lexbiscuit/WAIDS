import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import MyResponsivePie from "./MyResponsivePie";
import Title from "./Title";

const ChartItem = ({ view }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box height={"20rem"} border={"1px solid"} p={2}>
        <Title>{`${view}`.charAt(0).toUpperCase() + `${view}`.slice(1)}</Title>
        <MyResponsivePie id={view} />
      </Box>
    </Grid>
  );
};

const Charts = ({ viewsList }) =>
  viewsList.map((view, index) => <ChartItem key={index} view={view} />);

export default Charts;
