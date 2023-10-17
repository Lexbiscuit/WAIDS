"use client";
import React from "react";
import ResponsiveAppBar from "@/app/_components/Appbar_no_auth";
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

const TeamMembers = [
  {
    name: "Lim Hong Shin Dave",
    picture: dp,
    studentNum: 7538686,
    email: "hsdlim001@mymail.sim.edu.sg"
  },
  {
    name: "Lexus Lim Zi Xuan",
    picture: dp,
    studentNum: 7680533,
    email: "lzxlim001@mymail.sim.edu.sg"
  },
  {
    name: "Md Jainuddin Taseen",
    picture: dp,
    studentNum: 7564892,
    email: "tas001@mymail.sim.edu.sg"
  },
  {
    name: "Lim Shu Zheng",
    picture: dp,
    studentNum: 7768928,
    email: "szlim009@mymail.sim.edu.sg"
  },
  {
    name: "Lau Jin Ming",
    picture: dp,
    studentNum: 7672524,
    email: "jmlau004@mymail.sim.edu.sg"
  },
  {
    name: "Tan Yi Ren",
    picture: dp,
    studentNum: 7434807,
    email: "yrtan028@mymail.sim.edu.sg"
  },
]

const MemberGridItem = (props) => {
  const {name, picture, studentNum, email} = props.member;

  return (
  <Grid item xs={12} sm={6} md={4} sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
    <Typography variant="h5" fontWeight="bold">{name}</Typography>
    <Image src={picture} width={"100"} height={100} />
    <Typography variant="body1">Student no. {studentNum}</Typography>
    <Typography variant="body1">{email}</Typography>
  </Grid>
)};

export default function AboutUs() {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg">
      <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
      <Typography variant="h5">
            About Us
      </Typography>
      <Paper elevation={3} sx={{my: 4}} style={{ padding: "20px", borderRadius: "20px" }}>
          {/* Content inside the curved rectangle */}
          <Typography variant="body1" textAlign="center">
          We are a group of year 3 students from different backgrounds and majors studying at University of Wollongong.
              <br /><br />
              We are tasked to build a web-based analysis intrusion detection system dashboard for our Final Year Project.
              <br /><br />
              The scope of the project is to develop a virtualized dashboard system that facilitates network administrators in monitoring their networks using intrusion detection systems (IDS) such as Snort, Kismet, Zeek (Bro), and Suricata. The project will focus on creating a web-based dashboard with features to aggregate and display data from multiple IDS tools, provide real-time monitoring, and offer analysis and visualisation capabilities. The scope includes integrating with the IDS tools, designing the user interface, putting data analysis methods into practice, and making sure the system is efficient and scalable.
          </Typography>
        </Paper>

      <Container maxWidth="lg" sx={{mb: 4}}>
        <Grid container rowSpacing={3}>
          {TeamMembers.map((member) => <MemberGridItem member={member} />
          )}
        </Grid>
     </Container>
      </Box>
      </Container>
    </Box>
  );
}
