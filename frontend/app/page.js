"use client";
import React from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

export default function Home() {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
    </Box>
  );
}
