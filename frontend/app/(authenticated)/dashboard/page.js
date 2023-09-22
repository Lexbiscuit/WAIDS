"use client";
import * as React from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import ResponsiveAppBar from "@/app/(authenticated)/ResponsiveAppBar";
import LiveLogFeed from "./LiveLogFeed";
import MyResponsivePie from "./MyResponsivePie";
import ChartItem from "./ChartItem";
import Title from "./Title";
import MyResponsiveLine from "./MyResponsiveLine";
import MyResponsiveBar from "./MyResponsiveBar";
import ViewManager from "./ViewManager";
import EventOverview from "./EventOverview";

export default function Dashboard() {
  const [views, setViews] = React.useState([
    {
      title: "Protocol",
      component: (
        <ChartItem>
          <Title>Protocol</Title>
          <MyResponsivePie id="protocol" />
        </ChartItem>
      ),
    },
    {
      title: "Priority",
      component: (
        <ChartItem>
          <Title>Priority</Title>
          <MyResponsivePie id="priority" />
        </ChartItem>
      ),
    },
    {
      title: "Intrusion/month (recent year)",
      component: (
        <ChartItem>
          <Title>Intrusion/month (recent year)</Title>
          <MyResponsiveLine id="month" time="month" />
        </ChartItem>
      ),
    },
    {
      title: "Intrusion/year",
      component: (
        <ChartItem>
          <Title>Intrusion/year</Title>
          <MyResponsiveLine id="year" time="year" />
        </ChartItem>
      ),
    },
    {
      title: "Classification count",
      component: (
        <ChartItem>
          <Title>Classification count</Title>
          <MyResponsiveBar id="classification" />
        </ChartItem>
      ),
    },
  ]);

  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <EventOverview />
      {/* CHARTS */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={0.5} m={0}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <ViewManager views={views} setViews={setViews} />
          </Grid>
          {views.map((view) => view.component)}
          {/* LIVE LOG FEED */}
          <LiveLogFeed />
        </Grid>
      </Container>
    </Box>
  );
}
