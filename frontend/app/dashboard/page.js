"use client";
import { Box, Grid, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { useState } from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import FakeData from "@/app/global/FakeData";
import Topbar from "@/app/global/Topbar";
import SideBar from "@/app/global/ProSidebar";
import { ColorModeContext, useMode } from "@/app/theme";
import Header from "@/app/global/Header";

export default function Dashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
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
                    <InfiniteScroll
                      pageStart={0}
                      hasMore={false}
                      initialLoad={true}
                      loader={
                        <div className="loader" key={0}>
                          Loading ...
                        </div>
                      }
                    >
                      {FakeData.map((item, index) => (
                        <li key={index}>
                          <a
                            href="/"
                            target="_blank"
                            rel="noopener"
                            style={{ textDecoration: "none" }}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </InfiniteScroll>
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
