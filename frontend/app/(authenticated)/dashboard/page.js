"use client";
import React from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import Header from "@/app/components/Header";
import ResponsiveAppBar from "@/app/(authenticated)/ResponsiveAppBar";
import LiveLogFeed from "./LiveLogFeed";
import MyResponsivePie from "./MyResponsivePie";
import ChartItem from "./ChartItem";
import Title from "./Title";
import MyResponsiveLine from "./MyResponsiveLine";

export default function Dashboard() {

  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      {/* HEADER */}
      {/* <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="20px"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box> */}

      {/* CHARTS */}
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <ChartItem>
            <Title>Protocol</Title>
            <MyResponsivePie id="protocol"/>
          </ChartItem>

          <ChartItem>
            <Title>Priority</Title>
            <MyResponsivePie id="priority"/>
          </ChartItem>

          <ChartItem>
            <Title>Intrusion/month</Title>
            <MyResponsiveLine id="month"/>
          </ChartItem>

          <ChartItem>
            <Title>Intrusion/year</Title>
            <MyResponsiveLine id="year"/>
          </ChartItem>

          
          {/* LIVE LOG FEED */}
          <LiveLogFeed />
        </Grid>
      </Container>
    </Box>
  );
}
