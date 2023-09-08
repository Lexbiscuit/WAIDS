"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "@/app/components/ResponsiveAppBar";
import { ColorModeContext, useMode } from "@/app/theme";

export default function Support() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <ResponsiveAppBar />
            {/* Code goes here */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}