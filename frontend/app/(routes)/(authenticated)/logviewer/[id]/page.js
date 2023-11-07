"use client";
import { Box, TextField, Container, InputAdornment, Grid } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React from "react";
import FullDetailsComponent from "@/app/_components/_logviewer/FullDetailsComponent";

export default function LogViewItem({ params }) {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <FullDetailsComponent id={params.id} />
      </Container>
    </Box>
  );
}
