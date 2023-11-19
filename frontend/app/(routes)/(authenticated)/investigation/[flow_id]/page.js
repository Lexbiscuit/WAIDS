import { Box, Container, Grid } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React from "react";
import FullDetailsComponent from "@/app/_components/_investigation/FullDetailsComponent";

export default function InvestigationItem({ params }) {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Grid container gap={2}>
          <FullDetailsComponent flow_id={params.flow_id} />
        </Grid>
      </Container>
    </Box>
  );
}
