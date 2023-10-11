"use client";
import { Box, TextField, Container, InputAdornment, Grid } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React from "react";
import { getData_id } from "@/app/_utils/getData_id";
import FullDetailsComponent from "@/app/_components/_investigation/FullDetailsComponent";

export default function LogViewItem({ params }) {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Container>
    </Box>
  );
}
