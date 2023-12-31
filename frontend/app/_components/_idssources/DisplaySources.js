"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

export default function DisplaySources() {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchAllSources"],
    queryFn: async () => {
      const { data } = await axios.get("/api/idssources/all");
      return data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <h1>Loading...</h1>;
  }
  if (status == "error") {
    return <h1>Error</h1>;
  }
  if (status == "success") {
    return (
      <Grid container spacing={2}>
        {data.map((source) => (
          <Grid item xs={12} sm={6} md={4} key={source._id}>
            <Item {...source} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

function Item({ name, isEnabled }) {
  const typoHeaderStyle = {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 0.5,
    fontWeight: "bold",
    fontSize: "1.5rem",
  };

  const typoBodyStyle = {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 0.5,
  };

  const queryClient = useQueryClient();

  const toggleSource = useMutation({
    mutationFn: (update) => axios.put("/api/idssources/toggle", update),
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllSources");
    },
  });

  return (
    <Card
      sx={{
        minHeight: "10rem",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography sx={typoHeaderStyle}>Name: {name}</Typography>
        <Typography sx={typoBodyStyle}>
          Enabled: {isEnabled ? "True" : "False"}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid width="100%">
          <Grid item xs={6}>
            <Button
              size="small"
              sx={{ justifyContent: "start" }}
              onClick={() =>
                toggleSource.mutate({ name: name, isEnabled: !isEnabled })
              }
            >
              <strong>{isEnabled ? "Disable" : "Enable"}</strong>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              size="small"
              sx={{ justifyContent: "start" }}
              href={`/idssources/${name}`}
            >
              Modify Rules
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
