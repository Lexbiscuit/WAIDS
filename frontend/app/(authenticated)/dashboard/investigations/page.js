import React from "react";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import InvestigationTable from "./components/InvestigationTable";

const InvestigationsPage = async () => {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <InvestigationTable />
      </Container>
    </Box>
  );
};

export default InvestigationsPage;
