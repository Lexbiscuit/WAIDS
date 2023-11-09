import { Container, Paper, Grid, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CardComponent = ({ children }) => {
  return (
    <Paper variant="outlined">
      <Card variant="elevation">{children}</Card>
    </Paper>
  );
};

export default function EventOverview() {
  const {
    data: countData,
    status: countStatus,
    isFetching: countIsFetching,
  } = useQuery({
    queryKey: ["fetchEventOverviewCount"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/EventOverview/Count`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 10000,
  });

  const {
    data: uniqueData,
    status: uniqueStatus,
    isFetching: uniqueIsFetching,
  } = useQuery({
    queryKey: ["fetchEventOverviewUnique"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/EventOverview/Unique`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 10000,
  });

  const {
    data: criticalData,
    status: criticalStatus,
    isFetching: criticalIsFetching,
  } = useQuery({
    queryKey: ["fetchEventOverviewCritical"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/EventOverview/Critical`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 10000,
  });

  return (
    <Container component="div" maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              All Events
            </Typography>
            <Typography variant="h3" color="inherit">
              {countIsFetching ? "Loading ..." : null}
              {countStatus == "error" ? "Error" : null}
              {!countIsFetching && countStatus == "success" ? countData : null}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Critical Events
            </Typography>
            <Typography variant="h3" color="inherit">
              {criticalIsFetching ? "Loading ..." : null}
              {criticalStatus == "error" ? "Error" : null}
              {!criticalIsFetching && criticalStatus == "success"
                ? criticalData
                : null}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Unique Source IP
            </Typography>
            <Typography variant="h3" color="inherit">
              {uniqueIsFetching ? "Loading ..." : null}
              {uniqueStatus == "error" ? "Error" : null}
              {!uniqueIsFetching && uniqueStatus == "success"
                ? uniqueData
                : null}
            </Typography>
          </CardComponent>
        </Grid>
      </Grid>
    </Container>
  );
}
