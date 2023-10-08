import { useEffect } from "react";
import { Container, Grid } from "@mui/material";

const ChartComponent = () => {
  useEffect(() =>
    setInterval(() => {
      async function fetchData() {
        await Promise.all([fetch(), fetch(), fetch()]);
      }
      fetchData();
    }, 5000)
  );

  <Container maxWidth="xl" sx={{ py: 4 }}>
    <Grid container spacing={0.5} m={0}>
      //{" "}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", flexDirection: "row-reverse" }}
      ></Grid>
      // {views.map((view) => view.component)}
      {/* LIVE LOG FEED */}
      <LiveLogFeed />
    </Grid>
  </Container>;
};

export default ChartComponent;
