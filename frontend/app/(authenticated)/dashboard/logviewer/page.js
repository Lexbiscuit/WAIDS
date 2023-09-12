"use client";
import {
  CssBaseline,
  ThemeProvider,
  Box,
} from "@mui/material";
import { ColorModeContext, useMode } from "@/app/theme";
import Header from "@/app/global/Header";
import ResponsiveAppBar from "@/app/(authenticated)/components/ResponsiveAppBar";

export default function LogView() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <ResponsiveAppBar />
              <Box m="20px" sx={{height: "100%"}}>
                {/* HEADER */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Header
                    title="LOG VIEW"
                    subtitle="View NIDS Log Data"
                  />
                </Box>

                <Box component="img" src="https://media4.giphy.com/media/WoKqL8nGDJfFwGzrmR/giphy.gif?cid=ecf05e47uz8q4srrojspqdnijuuxx8lyx8p79lkpi8bfr6r3&ep=v1_gifs_search&rid=giphy.gif&ct=g" sx={{ width: "100%", height: "100%"}}>
                  
                </Box>
              </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
