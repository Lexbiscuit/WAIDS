"use client";
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
import LiveLogFeed from "./components/LiveLogFeed";
import MyResponsivePie from "./components/MyResponsivePie";

export default function Dashboard() {
  const [theme, colorMode] = useMode();
  const viewsList = ["protocol", "priority", "classification", "protocol", "priority", "classification"];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                <Header
                  title="DASHBOARD"
                  subtitle="Welcome to your dashboard"
                />
              </Box>
              <Box display="flex">
                <Grid container spacing={2} sx={{ textAlign: "center" }}>
                  {viewsList.map((view) => (
                    <Grid item xs={12} md={6} lg={4}>
                      <Box height={"20rem"} border={"1px solid"}>
                        <Typography variant="h1" color="inherit">
                          {view}
                        </Typography>
                        <MyResponsivePie category={view} />
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
                    variant="h1"
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
