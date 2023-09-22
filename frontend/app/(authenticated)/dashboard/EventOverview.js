import { Container, Paper, Grid, Card, Typography } from "@mui/material";
import * as React from "react";

const getEventOverviewCount = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/dashboard/EventOverview/Count",
      {
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    console.log("Error getting logs: ", error);
  }
};

const getEventOverviewUnique = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/dashboard/EventOverview/Unique",
        {
          cache: "no-store",
        }
      );
    
      return res.json();
    } catch (error) {
      console.log("Error getting logs: ", error);
    }
  };

  const getEventOverviewCritical = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/dashboard/EventOverview/Critical",
        {
          cache: "no-store",
        }
      );
    
      return res.json();
    } catch (error) {
      console.log("Error getting logs: ", error);
    }
  };
  

const CardComponent = ({ children }) => {
  return (
    <Paper variant="outlined">
      <Card variant="elevation">{children}</Card>
    </Paper>
  );
};

export default function EventOverview() {
  const [eventOverviewTotal, setEventOverviewTotal] = React.useState(null);
  const [eventOverviewCritical, setEventOverviewCritical] =
    React.useState(null);
  const [eventOverviewUniqueSrc, setEventOverviewUniqueSrc] =
    React.useState(null);

  React.useEffect(() => {
    setInterval(async () => {
      getEventOverviewCount().then((data) => {
        setEventOverviewTotal(data.data);
      });

      getEventOverviewCritical().then((data) => {
        setEventOverviewCritical(data.data);
      });

      getEventOverviewUnique().then((data) => {
        setEventOverviewUniqueSrc(data.data[0].count);
      });
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
              {eventOverviewTotal ? eventOverviewTotal : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Critical Events
            </Typography>
            <Typography variant="h3" color="inherit">
              {eventOverviewCritical ? eventOverviewCritical : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent>
            <Typography variant="h6" color="inherit">
              Unique Source IP
            </Typography>
            <Typography variant="h3" color="inherit">
              {eventOverviewUniqueSrc ? eventOverviewUniqueSrc : "Loading ..."}
            </Typography>
          </CardComponent>
        </Grid>
      </Grid>
    </Container>
  );
}
