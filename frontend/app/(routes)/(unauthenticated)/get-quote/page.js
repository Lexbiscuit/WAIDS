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
  Paper,
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
  basic: "#CD7F32", // Example color for Basic tier
  advanced: "#C0C0C0", // Example color for Advance tier
  premium: "#FFD700", // Example color for Premium tier
};

const getTierTooltip = (tier) => {
  switch (tier) {
    case "basic":
      return "Basic Tier: Basic features with a small fee.";
    case "advanced":
      return "Advanced Tier: Advanced features for advance users.";
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
        <Card style={cardStyle}>
          <CardContent>
            {/* Add content for the Basic tier card */}
            <Grid container rowSpacing={2} textAlign="center">
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold">
                  [Basic]
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">✓ 1 User Accounts</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">✓ 100GB Cloud Storage</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">✓ 2 Protected Endpoints</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Access to Log Input Plugins
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Ticket and Chat Support
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Basic Authentication <br />+<br />
                  Access Control
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    case "advanced":
      return (
        <Card style={cardStyle}>
          <CardContent>
            {/* Add content for the Basic tier card */}
            <Grid container rowSpacing={2} textAlign="center">
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold">
                  [Advanced]
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">✓ 100 User Accounts</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">✓ 5TB Cloud Storage</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ 20 Protected Endpoints
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Access to Log Input Plugins
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Ticket, Chat and Call Support
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Custom Authentication
                  <br />+<br />
                  Role-based Access Control
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    case "premium":
      return (
        <Card style={cardStyle}>
          <CardContent>
            {/* Add content for the Basic tier card */}
            <Grid container rowSpacing={2} textAlign="center">
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold">
                  [Premium]
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">✓ 1000+ User Accounts</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">✓ 10TB+ Cloud Storage</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ 100+ Protected Endpoints
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Access to Log Input Plugins
                  <br />+<br />
                  Custom made plugins
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Ticket and Chat Support
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  ✓ Custom Authentication
                  <br />+<br />
                  Role-based Access Control
                </Typography>
              </Grid>
            </Grid>
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

  subscription: yup
    .string()
    .required()
    .oneOf(["basic", "advanced", "premium"])
    .label("Selected Subscription"),

  phone: yup
    .string("Enter your phone number")
    .required("Phone number is required")
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Please enter a valid phone number"
    ),

  name: yup.string("Enter your name").required("Name is required"),

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
      subscription: "",
      name: "",
      accounts: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await fetch("http://localhost:3000/api/getquote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((res) => {
        res.json().then((data) => {
          const {message} = data;
          if (message == "success") {
            alert(
              "Thank you for your interest. We will get back to you as soon as possible."
            );
          } else {
            alert("Something went wrong. Please try again later.");
          }
        });
      });
    },
  });

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
          <Typography variant="h5" mb={3}>
            Get Quote
          </Typography>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            {/* Content inside the curved rectangle */}
            <Typography variant="body1">
              Please fill-up the form to get a personalized quote, that bests
              suits your requirements. Our sales reprensetative will get back to
              you as soon as possible.
            </Typography>
          </Paper>

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
            />

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
            />

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
            />

            {/* Radio button group for tier list subscription */}
            <Typography variant="subtitle1" mt={2}>
              Select Subscription Tier:
            </Typography>
            <Grid container spacing={2}>
              {subscriptionOptions.map((option) => (
                <Grid item xs={12} sm={4} key={option.value}>
                  <Tooltip title={getTierTooltip(option.value)}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.subscription === option.value}
                          onChange={() =>
                            formik.setFieldValue("subscription", option.value)
                          }
                        />
                      }
                      label={option.label}
                    />
                  </Tooltip>
                  {getTierCard(option.value)}
                </Grid>
              ))}
            </Grid>

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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get Quote
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
