"use client";
import React from "react";
import ResponsiveAppBar from "@/app/components/ResponsiveAppBar";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";
import dp from "@/public/profile-icon.png";


const tableStyle = {
  borderCollapse: "collapse", // Remove cell borders
  width: "100%",
  textAlign: "center",
};

const cellStyle = {
  border: "none", // Remove cell borders
  padding: "8px", // Add padding to cells for spacing
  textAlign: "center",
  width: "33.33%",
};


const boldHeaderStyle = {
  fontWeight: "bold", // Make header text bold
  fontSize: "24px",
};

export default function AboutUs() {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg">
      <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
      <Typography component="h1" variant="h5">
            About Us
      </Typography>
      <br></br>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "20px" }}>
          {/* Content inside the curved rectangle */}
          <Typography variant="body1">
          We are a group of year 3 students from different backgrounds and majors studying at University
          of Wollongong. 
          <br></br>
          We are tasked to build a web-based analysis intrusion detection system dashboard for our
          Final Year Project.
          <br></br>
          <br></br>
          The scope of the project is to develop a virtualized dashboard system that facilitates network administrators in monitoring their networks using intrusion detection systems (IDS) such as Snort, Kismet, Zeek (Bro), and Suricata. The project will focus on creating a web-based dashboard with features to aggregate and display data from multiple IDS tools, provide real-time monitoring, and offer analysis and visualisation capabilities. The scope includes integrating with the IDS tools, designing the user interface, putting data analysis methods into practice, and making sure the system is efficient and scalable.
          </Typography>
        </Paper>
      <br></br>
      <br></br>
      <Container maxWidth="lg">
          <TableContainer component={Paper}>
          <Table style={tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell style={Object.assign({}, cellStyle, boldHeaderStyle)}>Lim Hong Shin Dave</TableCell>
                <TableCell style={Object.assign({}, cellStyle, boldHeaderStyle)}>Lexus Lim Zi Xuan</TableCell>
                <TableCell style={Object.assign({}, cellStyle, boldHeaderStyle)}>Md Jainuddin Taseen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>
                  <Image src={dp} alt="Image 1" width="100" />
                </TableCell>
                <TableCell style={cellStyle}>
                  <Image src={dp} alt="Image 2" width="100" />
                </TableCell>
                <TableCell style={cellStyle}>
                  <Image src={dp} alt="Image 3" width="100" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle}>Student no. 7538686
                <br></br>
                hsdlim001@mymail.sim.edu.sg
                </TableCell>
                <TableCell style={cellStyle}>Student no. 7680533
                <br>
                </br>
                lzxlim001@mymail.sim.edu.sg
                </TableCell>
                <TableCell style={cellStyle}>Student no. 7564892
                <br></br>
                tas001@mymail.sim.edu.sg
                </TableCell>
              </TableRow>
            </TableBody>
            <br></br>
            <br></br>
            <TableHead>
              <TableRow>
                <TableCell style={Object.assign({}, cellStyle, boldHeaderStyle)}>Lim Shu Zheng</TableCell>
                <TableCell style={Object.assign({}, cellStyle, boldHeaderStyle)}>Lau Jin Ming</TableCell>
                <TableCell style={Object.assign({}, cellStyle, boldHeaderStyle)}>Tan Yi Ren</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>
                  <Image src={dp} alt="Image 1" width="100" />
                </TableCell>
                <TableCell style={cellStyle}>
                  <Image src={dp} alt="Image 2" width="100" />
                </TableCell>
                <TableCell style={cellStyle}>
                  <Image src={dp} alt="Image 3" width="100" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle}>Student no. 7768928
                <br></br>
                szlim009@mymail.sim.edu.sg
                </TableCell>
                <TableCell style={cellStyle}>Student no. 7672524
                <br></br>
                jmlau004@mymail.sim.edu.sg
                </TableCell>
                <TableCell style={cellStyle}>Student no. 7434807
                <br></br>
                yrtan028@mymail.sim.edu.sg
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br></br>
          <br></br>
          <br></br>
        </TableContainer>
      </Container>
      </Box>
      </Container>
    </Box>
  );
}
