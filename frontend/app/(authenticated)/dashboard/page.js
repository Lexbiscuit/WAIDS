"use client";
import React  from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Header from "@/app/global/Header";
import ResponsiveAppBar from "@/app/(authenticated)/components/ResponsiveAppBar";
import LiveLogFeed from "./components/LiveLogFeed";
import MyResponsivePie from "./components/MyResponsivePie";

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
    <div className="app">
      <main className="content">
        <ResponsiveAppBar />
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Box>
          <Box display="flex">
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
              {viewsList.map((view, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Box height={"20rem"} border={"1px solid"}>
                    <Typography variant="h3" color="inherit">
                      {`${view}`.charAt(0).toUpperCase() + `${view}`.slice(1)}
                    </Typography>
                    <MyResponsivePie id={view} />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box
              width="20%"
              ml="20px"
              borderColor={"white"}
              border={"1px solid"}
            >
              <Typography
                variant="h3"
                color="inherited"
                sx={{ textAlign: "center" }}
              >
                Live Data
              </Typography>
              <LiveLogFeed />
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  );
}
