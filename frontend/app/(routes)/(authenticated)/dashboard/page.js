"use client";
import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import Appbar_auth from "@/app/_components/Appbar_auth";
import LiveLogFeed from "@/app/_components/_dashboard/LiveLogFeed";
import MyResponsivePie from "@/app/_components/_dashboard/MyResponsivePie";
import ChartItem from "@/app/_components/_dashboard/ChartItem";
import Title from "@/app/_components/_dashboard/Title";
import MyResponsiveLine from "@/app/_components/_dashboard/MyResponsiveLine";
import MyResponsiveBar from "@/app/_components/_dashboard/MyResponsiveBar";
import EventOverview from "@/app/_components/_dashboard/EventOverview";
import MyTabContext from "@/app/_components/_dashboard/MyTabContext";

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
      <Appbar_auth />
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
