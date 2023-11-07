import React from "react";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import DisplaySources from "@/app/_components/_idssources/DisplaySources";

const IDSSourcesPage = async () => {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <DisplaySources />
      </Container>
    </Box>
  );
};

export default IDSSourcesPage;
