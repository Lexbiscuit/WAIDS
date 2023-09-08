"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "@/app/components/ResponsiveAppBar";
import { ColorModeContext, useMode } from "@/app/theme";
import FormikForm from "./components/FormikForm";

export default function Login() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <ResponsiveAppBar />
            <FormikForm />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
