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
  Paper,
  TextareaAutosize,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";

const subscriptionOptions = [
  { value: "basic", label: "Basic" },
  { value: "advanced", label: "Advanced" },
  { value: "premium", label: "Premium" },
  
];

const tierColors = {
  basic: "#CD7F32",   // Example color for Basic tier
  advanced: "#C0C0C0", // Example color for Advance tier
  premium: "#FFD700", // Example color for Premium tier
};

const getTierTooltip = (tier) => {
  switch (tier) {
    case "basic":
      return "Basic Tier: Basic features with a small fee.";
    case "advanced":
      return "Advance Tier: Advance features for advance users.";
    case "premium":
      return "Premium Tier: Premium features for full control and customisations.";
    default:
      return "";
  }
};

const getTierCard = (tier) => {
  const cardStyle = {
    backgroundColor: tierColors[tier], // Use the color from the color scheme
  };
  switch (tier) {
    case "basic":
      return (
        <Card style = {cardStyle}>
          <CardContent>
            {/* Add content for the Basic tier card */}
            <div style = {{textAlign: "center"}} >
            <strong style={{ fontSize: "24px" }}>[Basic]</strong>
            <br></br>
            <br></br>
            ✓ 1 user account
            <br></br>
            <br></br>
            ✓ 100GB of cloud storage
            <br></br>
            <br></br>
            ✓ 2 protected endpoints
            <br></br>
            <br></br>
            ✓ Access to collection of log input plugins
            <br></br>
            <br></br>
            ✓ Ticket and chat support
            <br></br>
            <br></br>
            ✓ Basic Authentication and Access Control
            </div>
          </CardContent>
        </Card>
      );
    case "advanced":
      return (
        <Card style = {cardStyle}>
          <CardContent>
            {/* Add content for the Advance tier card */}
            <div style = {{textAlign: "center"}} >
            <strong style={{ fontSize: "24px" }}>[Advanced]</strong>
            <br></br>
            <br></br>
            ✓ 100 user accounts
            <br></br>
            <br></br>
            ✓ 5TB of cloud storage
            <br></br>
            <br></br>
            ✓ 20 protected endpoints
            <br></br>
            <br></br>
            ✓ Access to collection of log input plugins
            <br></br>
            <br></br>
            ✓ Ticket, chat and call support
            <br></br>
            <br></br>
            ✓ Custom Authentication and 
            <br></br>
            <br></br>
            Role-based Access Control
            </div>
          </CardContent>
        </Card>
      );
    case "premium":
      return (
        <Card style = {cardStyle}>
          <CardContent>
            {/* Add content for the Premium tier card */}
            <div style = {{textAlign: "center"}} >
            <strong style={{ fontSize: "24px" }}>[Premium]</strong>
            <br></br>
            <br></br>
            ✓ 1000+ user accounts
            <br></br>
            <br></br>
            ✓ 10TB+ of cloud storage
            <br></br>
            <br></br>
            ✓ 100+ protected endpoints
            <br></br>
            <br></br>
            ✓ Access to collection of log input plugins + custom made plugins
            <br></br>
            <br></br>
            ✓ Ticket, chat and call support
            <br></br>
            <br></br>
            ✓ Custom Authentication and 
            <br></br>
            <br></br>
            Role-based Access Control
            </div>
          </CardContent>
        </Card>
      );
    default:
      return null; // Return null if no tier is selected
  }
};


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  message: yup.string("Enter your message").required("Message is required"),
  name: yup
    .string("Enter your name")
    .required("Name is required"),
  accounts: yup
    .number("Enter the number of accounts")
    .positive("Number of accounts must be greater than 0")
    .integer("Number of accounts must be an integer")
    .required("Number of accounts is required"),
});

export default function GetQuote() {
  const formik = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await signIn("credentials", {
        email: values.email,
        message: values.message,
        redirect: true,
        callbackUrl: "/dashboard"
      });
    },
  });

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
            Get Quote
          </Typography>
          <br></br>
          <Paper elevation={3} style={{ padding: "20px", borderRadius: "20px", textAlign:"center" }}>
            {/* Content inside the curved rectangle */}
            <Typography variant="body1">
            Please fill-up the form to get a personalized quote, that bests suits your requirements.
            <br></br>
            Our sales reprensetative will get back to you as soon as possible.
            </Typography>
            </Paper>
          <br></br>
          <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              autoFocus
            />

            <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoFocus
            />

            <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              autoFocus
            />
            <br></br>
            <br></br>

            {/* Radio button group for tier list subscription */}
            <Typography component="h2" variant="subtitle1">
            Select Subscription Tier:
            </Typography>
            <Grid container spacing={2}>
            {subscriptionOptions.map((option) => (
              <Grid item xs={4} key={option.value}>
                <Tooltip title={getTierTooltip(option.value)}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.subscription === option.value}
                        onChange={() => formik.setFieldValue("subscription", option.value)}
                      />
                    }
                    label={option.label}
                  />
                </Tooltip>
                {getTierCard(option.value)}
              </Grid>
            ))}
          </Grid>
          
          <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="accounts"
              label="Number of accounts"
              name="accounts"
              type="number"
              autoComplete="accounts"
              value={formik.values.accounts}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.accounts && Boolean(formik.errors.accounts)}
              helperText={formik.touched.accounts && formik.errors.accounts}
              autoFocus
            />
            <br></br>
            <br></br>
            <br></br>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Get Quote
            </Button>
            <br></br>
            <br></br>
            <br></br>
            </Box>
            </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}