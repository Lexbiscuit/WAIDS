"use client";
import Topbar from "@/app/components/Topbar";
import ProSidebar from "@/app/components/ProSidebar";
import { ColorModeContext, useMode } from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export const metadata = {
  title: "Login",
  //   Description for Login Page
  description: "Login Page for the WAIDS Web Application.",
};

export default function LoginLayout({ children }) {
  const [theme, colorMode] = useMode();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isDesktop == false && <ProSidebar />}
            <main className="content">
              <Topbar />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
