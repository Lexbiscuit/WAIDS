import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";
import Title from "./Title";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getDateString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

const getTimeString = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString();
};

export default function LiveLogFeed() {
  const { data, status, isFetching } = useQuery({
    queryKey: ["fetchLiveLogFeed"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/LiveLogFeed`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 5000,
  });

  if (isFetching) {
    return <Typography>Loading...</Typography>;
  }
  if (status == "error") {
    return <Typography>An error occured...</Typography>;
  }
  if (status == "success") {
    return (
      <Grid item xs={12} mt={4}>
        <TableContainer maxWidth="xl" p={2}>
          <Title>Recent Logs</Title>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Signature</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Protocol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{getDateString(log.timestamp)}</TableCell>
                  <TableCell>{getTimeString(log.timestamp)}</TableCell>
                  <TableCell>{log.alert.signature}</TableCell>
                  <TableCell>{log.alert.category}</TableCell>
                  <TableCell>{log.alert.severity}</TableCell>
                  <TableCell>{log.proto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}
