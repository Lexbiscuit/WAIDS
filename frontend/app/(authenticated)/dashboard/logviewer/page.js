"use client";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Container,
} from "@mui/material";
import ResponsiveAppBar from "@/app/(authenticated)/ResponsiveAppBar";
import CollapsibleTable from "./CollapsibleTable";
import { React, useState } from "react";

export default function LogView() {

  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="xl" sx={{my: 2}}>
        
        {/* Search Bar */}
          <Grid container>
            <Grid item xs={11}>
              <TextField
                id="filled-basic"
                label="Search bar"
                variant="filled"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                sx={{ width: "100%", height: "100%" }}
              >
                Search
              </Button>
            </Grid>
          </Grid>

        {/* Log Table */}
        <CollapsibleTable />

      </Container>
    </Box>
  );
}
