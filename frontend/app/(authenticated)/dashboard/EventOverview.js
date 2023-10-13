import { Container, Paper, Grid, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";

const CardComponent = ({ children }) => {
  return (
    <Paper variant="outlined">
      <Card variant="elevation">{children}</Card>
    </Paper>
  );
};

export default function EventOverview() {
  const [eventOverview, setEventOverview] = React.useState(null);

  // useEffect(() => {
  //   setInterval(() => {
  //     async function fetchData() {
  //       await Promise.all([
  //         fetch("http://localhost:3000/api/dashboard/EventOverview/Count", {
  //           cache: "no-store",
  //         }),
  //         fetch("http://localhost:3000/api/dashboard/EventOverview/Unique", {
  //           cache: "no-store",
  //         }),
  //         fetch("http://localhost:3000/api/dashboard/EventOverview/Critical", {
  //           cache: "no-store",
  //         }),
  //       ])
  //         .then((res) => Promise.all(res.map((r) => r.json())))
  //         .then((res) => setEventOverview(res));
  //     }
  //     fetchData();
  //   }, 5000);
  // }, []);

  useEffect(() => {
    setInterval(() => {
      async function fetchData() {
        try {
          const responses = await Promise.all([
            fetch("http://localhost:3000/api/dashboard/EventOverview/Count", {
              cache: "no-store",
            }),
            fetch("http://localhost:3000/api/dashboard/EventOverview/Unique", {
              cache: "no-store",
            }),
            fetch("http://localhost:3000/api/dashboard/EventOverview/Critical", {
              cache: "no-store",
            }),
          ]);
  
          const jsonResponses = await Promise.all(
            responses.map(async (r) => {
              if (!r.ok) {
                throw new Error(`Request failed with status ${r.status}`);
              }
              const data = await r.json();
              return data;
            })
          );
  
          setEventOverview(jsonResponses);
        } catch (error) {
          // Handle any errors, e.g., network errors or failed requests
          console.error("Error fetching data:", error);
          // Optionally, you can set eventOverview to null or handle the error differently
          setEventOverview(null);
        }
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
              {eventOverview ? eventOverview[0].count : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Critical Events
            </Typography>
            <Typography variant="h3" color="inherit">
              {eventOverview ? eventOverview[1].count : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Unique Source IP
            </Typography>
            <Typography variant="h3" color="inherit">
              {eventOverview ? eventOverview[2].count : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
      </Grid>
    </Container>
  );
}