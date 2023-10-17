import React from "react";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import InvestigationTable from "@/app/_components/_investigation/InvestigationTable";

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
