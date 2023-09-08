"use client";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { ColorModeContext, useMode } from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function Home() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <ResponsiveAppBar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
