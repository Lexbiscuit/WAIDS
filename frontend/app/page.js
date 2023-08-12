"use client";
import { useState } from "react";
import Topbar from "./components/Topbar";
import { ColorModeContext, useMode } from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function Home() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
