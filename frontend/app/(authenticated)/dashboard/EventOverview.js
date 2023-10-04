import { Container, Paper, Grid, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const CardComponent = ({ children }) => {
  return (
    <Paper variant="outlined">
      <Card variant="elevation">{children}</Card>
    </Paper>
  );
};

export default function EventOverview() {
  const [eventOverview, setEventOverview] = React.useState(null);

  useEffect(() => {
    setInterval(() => {
      async function fetchData() {
        await Promise.all([
          fetch("http://localhost:3000/api/dashboard/EventOverview/Count", {
            cache: "no-store",
          }),
          fetch("http://localhost:3000/api/dashboard/EventOverview/Unique", {
            cache: "no-store",
          }),
          fetch("http://localhost:3000/api/dashboard/EventOverview/Critical", {
            cache: "no-store",
          }),
        ])
          .then((res) => Promise.all(res.map((r) => r.json())))
          .then((res) => setEventOverview(res));
      }
      fetchData();
    }, 5000);
  }, []);

  return (
    <Container component="div" maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              All Events
            </Typography>
            <Typography variant="h3" color="inherit">
              {eventOverview ? eventOverview[0] : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Critical Events
            </Typography>
            <Typography variant="h3" color="inherit">
              {eventOverview ? eventOverview[1].length : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Unique Source IP
            </Typography>
            <Typography variant="h3" color="inherit">
              {eventOverview ? eventOverview[2] : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
      </Grid>
    </Container>
  );
}
