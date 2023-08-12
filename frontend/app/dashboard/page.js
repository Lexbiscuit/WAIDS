"use client";
import { useState } from "react";
import Topbar from "@/app/global/Topbar";
import SideBar from "@/app/global/ProSidebar";
import { ColorModeContext, useMode } from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

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
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
