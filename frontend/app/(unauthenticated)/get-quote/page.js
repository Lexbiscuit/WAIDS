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
} from "@mui/material";

const subscriptionOptions = [
  { value: "basic", label: "Basic" },
  { value: "advance", label: "Advance" },
  { value: "premium", label: "Premium" },
  
];

const getTierTooltip = (tier) => {
  switch (tier) {
    case "basic":
      return "Basic Tier: Basic features with a small fee.";
    case "advance":
      return "Advance Tier: Advance features for advance users.";
    case "premium":
      return "Premium Tier: Premium features for full control and customisations.";
    default:
      return "";
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            </Box>
            </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
