"use client";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Grid
} from "@mui/material";
import { ColorModeContext, useMode } from "@/app/theme";
import Header from "@/app/global/Header";
import ResponsiveAppBar from "@/app/(authenticated)/components/ResponsiveAppBar";
import CustomPaginationActionsTable from "./components/CustomPaginationActionsTable";

export default function LogView() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <ResponsiveAppBar />
            <Box m="20px" sx={{ height: "100%" }}>
              {/* HEADER */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header title="LOG VIEW" subtitle="View NIDS Log Data" />
              </Box>

              {/* MAIN BODY */}
              <Grid container height="100%" width="100%">
                <Grid item xs={12} md={6}>
                  {/* <DenseTable /> */}
                  <CustomPaginationActionsTable />
                </Grid>
                <Grid
                  item
                  md={6}
                  display={{ xs: "none", md: "block" }}
                  bgcolor="blue"
                ></Grid>
              </Grid>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
