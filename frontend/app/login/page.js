"use client";
import { useState } from "react";
import Topbar from "./components/Topbar";
import SideBar from "@/app/global/Sidebar";
import { ColorModeContext, useMode } from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import FormikForm from "./components/FormikForm";

export default function Login() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
            <FormikForm />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
