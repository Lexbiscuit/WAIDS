"use client";
import Topbar from "./components/Topbar";
import { ColorModeContext, useMode } from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ProSidebar from "@/app/components/ProSidebar";
import { useMediaQuery } from "@mui/material";

export default function Home() {
  const [theme, colorMode] = useMode();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isDesktop == false && <ProSidebar />}
          <main className="content">
            <Topbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
