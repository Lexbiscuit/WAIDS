import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const ChartItem = ({ children }) => {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <Box height={"20rem"} border={"1px solid"} p={1}>
            {children}
        </Box>
      </Grid>
    );
  };

export default ChartItem;