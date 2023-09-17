"use client";
import React from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import Header from "@/app/components/Header";
import ResponsiveAppBar from "@/app/(authenticated)/ResponsiveAppBar";
import Charts from "./Charts";
import LiveLogFeed from "./LiveLogFeed";
import MyResponsivePie from "./MyResponsivePie";

export default function Dashboard() {
  const viewsList = [
    "protocol",
    "priority",
    "classification",
    "protocol",
    "priority",
    "classification",
  ];

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
          <Charts viewsList={viewsList} />
          
          {/* LIVE LOG FEED */}
          <LiveLogFeed />
        </Grid>
      </Container>
    </Box>
  );
}
