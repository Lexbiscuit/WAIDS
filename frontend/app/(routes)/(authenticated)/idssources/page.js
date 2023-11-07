import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import DisplaySources from "@/app/_components/_idssources/DisplaySources";

const data = [
  {
    title: "Suricata",
    location: "localhost",
    status: "Active",
  },
];

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
