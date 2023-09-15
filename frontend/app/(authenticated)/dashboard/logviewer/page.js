"use client";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField
} from "@mui/material";
import Header from "@/app/global/Header";
import ResponsiveAppBar from "@/app/(authenticated)/components/ResponsiveAppBar";
import CustomPaginationActionsTable from "./components/CustomPaginationActionsTable";
import { React, useState } from "react";

export default function LogView() {
  const [currentData, setCurrentData] = useState(null);

  return (
    <div className="app">
      <main className="content">
        <ResponsiveAppBar />
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="LOG VIEW" subtitle="View NIDS Log Data" />
          </Box>

          {/* MAIN BODY */}
          <Box width="50%">
            <Grid container height="100%" width="100%">
              <Grid item xs={10}>
                <TextField id="filled-basic" label="Search bar" variant="filled" sx={{width: "100%"}}/>
              </Grid>      
              <Grid item xs={2}>
                <Button variant="contained" sx={{width: "100%", height: "100%"}}>Search</Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container height="100%" width="100%">
            <Grid item xs={12} md={6}>
              {/* <DenseTable /> */}
              <CustomPaginationActionsTable setCurrentData={setCurrentData} />
            </Grid>
            <Grid item md={6} display={{ xs: "none", md: "block" }}>
              {!currentData ? (
                <></>
              ) : (
                <Card padding="20px" sx={{position: "absolute", right: 20, minWidth: "45%"}}>
                  <CardContent>
                    <Typography variant="body1" color="inherit">
                      Signature ID: {currentData.signature_id}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Signature Rev ID: {currentData.signature_rev_id}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Description: {currentData.description}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Classification: {currentData.classification}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Priority: {currentData.priority}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Protocol: {currentData.protocol}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Source Address: {currentData.src_addr}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Source Port: {currentData.src_port}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Destination Address: {currentData.dst_addr}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      Destination Port: {currentData.dst_port}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
}
