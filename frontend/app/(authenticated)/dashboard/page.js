"use client";
import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import LiveLogFeed from "./components/LiveLogFeed";
import MyResponsivePie from "./components/MyResponsivePie";
import ChartItem from "./components/ChartItem";
import Title from "./components/Title";
import MyResponsiveLine from "./components/MyResponsiveLine";
import MyResponsiveBar from "./components/MyResponsiveBar";
import EventOverview from "./components/EventOverview";
import MyTabContext from "./components/MyTabContext";

export default function Dashboard() {
  const [views, setViews] = useState([
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
      <MyTabContext>
        {/* CHARTS */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={0.5} m={0}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", flexDirection: "row-reverse" }}
            >
              {/* <ViewManager views={views} setViews={setViews} /> */}
            </Grid>
            {views.map((view) => view.component)}
            {/* LIVE LOG FEED */}
            <LiveLogFeed />
          </Grid>
        </Container>
      </MyTabContext>
    </Box>
  );
}
