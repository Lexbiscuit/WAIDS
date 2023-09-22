import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer } from "@mui/material";
import { React, useEffect, useState } from "react";
import Title from "./Title";

const getLogs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/dashboard/LiveLogFeed", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch logs.");

    return res.json();
  } catch (error) {
    console.log("Error getting logs: ", error);
  }
};

const getDateString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
}

const getTimeString = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString();
}

export default function LiveLogFeed() {
  const [Logs, setLogs] = useState(null);

  useEffect(() => {
    setInterval(async () => {
      const { data } = await getLogs();
      setLogs(data);
    }, 5000);
  }, []);

  if (!Logs)
    return (
      <Typography variant="body1" color="inherit" textAlign="center">
        Loading...
      </Typography>
    );

  return (
    <Grid item xs={12}>
      <TableContainer maxWidth="xl" p={2}>
        <Title>Recent Logs</Title>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow >
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Logs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{getDateString(log.timestamp)}</TableCell>
              <TableCell>{getTimeString(log.timestamp)}</TableCell>
              <TableCell>{log.description}</TableCell>
              <TableCell>{log.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Grid>
  );
}
