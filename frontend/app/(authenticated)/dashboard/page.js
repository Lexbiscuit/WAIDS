"use client";
import { useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { ColorModeContext, useMode } from "@/app/theme";
import Header from "@/app/global/Header";
import ResponsiveAppBar from "@/app/(authenticated)/components/ResponsiveAppBar";

export default function Dashboard() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <ResponsiveAppBar />
            <>
              <Box m="20px">
                {/* HEADER */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Header
                    title="DASHBOARD"
                    subtitle="Welcome to your dashboard"
                  />
                </Box>
                <Box display="flex">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box bgcolor={"lightblue"} height={"20rem"}></Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box bgcolor={"lightblue"} height={"20rem"}></Box>{" "}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box bgcolor={"lightblue"} height={"20rem"}></Box>{" "}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box bgcolor={"lightblue"} height={"20rem"}></Box>{" "}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box bgcolor={"lightblue"} height={"20rem"}></Box>{" "}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box bgcolor={"lightblue"} height={"20rem"}></Box>{" "}
                    </Grid>
                  </Grid>
                  <Box
                    width="20%"
                    ml="20px"
                    borderColor={"white"}
                    border={"1px solid"}
                  >
                    <Typography variant="h1" color="initial">
                      Live Data
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
