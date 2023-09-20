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
} from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  message: yup.string("Enter your message").required("Message is required"),
  name: yup
    .string("Enter your name")
    .required("Name is required"),
});

export default function Support() {
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
            Support
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

            <textarea
              rows={5} // Set the number of rows
              cols={40} // Set the number of columns
              placeholder="Type your message here..."
              style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                fontSize: "16px",
                margin: "16px 0",
                boxSizing: "border-box",
                fontFamily: 'Roboto, Arial, sans-serif',
                overflowY: "auto", // Add a vertical scrollbar when content exceeds the limit
              }}
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
      </Container>
    </Box>
  );
}
