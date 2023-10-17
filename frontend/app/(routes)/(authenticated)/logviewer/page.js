import { Box, TextField, Container, InputAdornment } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React from "react";
import LogviewerTable from "@/app/_components/_logviewer/LogviewerTable";

export default async function LogView() {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <LogviewerTable />
      </Container>
    </Box>
  );
}
