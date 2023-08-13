"use client";
import { useState } from "react";
import Topbar from "@/app/global/Topbar";
import SideBar from "@/app/global/ProSidebar";
import { ColorModeContext, useMode } from "@/app/theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Header from "@/app/global/Header";

export const metadata = {
  title: "Dashboard",
  //   Description for Login Page
  description: "Dashboard Page for the WAIDS Web Application.",
};

export default function DashboardLayout({ children }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SideBar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
