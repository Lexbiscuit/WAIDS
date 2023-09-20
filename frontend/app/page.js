"use client";
import React from "react";
import { Box, Container, Typography, Paper, Link } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Image from "next/image";

// Import image files
//import placeholderimage from "@/public/placeholder.png";
import marketingimage from "@/public/marketing1.png";
import marketingimage2 from "@/public/marketing2.png";
import logo from "@/public/WaidsLogo.png";


export default function Home() {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />

      {/* Add space between AppBar and Container */}
      <div style={{ marginTop: "30px" }}></div>

      <Container maxWidth="lg">
        {/* Image 1 */}
        <Paper elevation={3} style={{ marginBottom: "20px", padding: "20px", borderRadius: "20px",
        display: "flex", justifyContent: "center", alignItems: "center"  }}>
        <Image src= {logo} alt="Your Image" style={{ width: "80%", height: "auto" }} />
          {/* Content inside the curved rectangle */}
        </Paper>

        {/* Add space between Paper components */}
        <div style={{ marginBottom: "40px" }}></div>

        <Typography variant="body1">
        <span style={{ fontSize: "3em", marginRight: "0.2em" }}>What is</span>
        <span style={{ fontSize: "3.5em", fontWeight: "bold", textDecoration: "underline", }}>WAIDS</span>
        <span style={{ fontSize: "3.5em", marginRight: "0.2em" }}>?</span>
        </Typography>
        <br></br>

        {/* Text 1 */}
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "20px" }}>
          {/* Content inside the curved rectangle */}
          <Typography variant="body1">
          The Web-based Analysis Intrusion Detection System (WAIDS) helps to assist the network administrator in monitoring the network. 
          <br></br>
          The WAIDS performs data mining and visualisation techniques on the data captured by the various IDS to obtain valuable information, which is then presented on a virtualized dashboard for the network administrator to view and act upon. 
          </Typography>
        </Paper>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* Image 2 */}
        <Paper elevation={3} style={{ marginBottom: "20px", padding: "20px", borderRadius: "20px" }}>
        <Image src= {marketingimage} alt="Your Image" style={{ width: "100%", height: "auto" }} />
          {/* Content inside the curved rectangle */}
        </Paper>

        {/* Text 2 */}
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "20px" }}>
        {/* Content inside the curved rectangle */}
        <Typography variant="body1">
        WAIDS provides an easy visualisation dashboard in the palm of your hands.
        <br></br>
        It also comes with activity logs to track live updates.
        </Typography>
        </Paper>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* Image 3 */}
        <Paper elevation={3} style={{ marginBottom: "20px", padding: "20px", borderRadius: "20px" }}>
        <Image src= {marketingimage2} alt="Your Image" style={{ width: "100%", height: "auto" }} />
          {/* Content inside the curved rectangle */}
        </Paper>

      </Container>
    </Box>
  );
}
