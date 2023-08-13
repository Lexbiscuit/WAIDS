"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Topbar from "@/app/components/Topbar";
import ProSidebar from "@/app/components/ProSidebar";
import { ColorModeContext, useMode } from "@/app/theme";
import FormikForm from "@/app/login/components/FormikForm";

export default function Login() {
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
            <FormikForm />{" "}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
