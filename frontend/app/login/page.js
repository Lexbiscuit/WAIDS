"use client";

import { Container, Box, Typography, TextField, Button } from "@mui/material";
import styles from "./styles.module.css";
import { useState } from "react";
import { Formik } from "formik";

const LoginForm = () => (
  <Container className={styles.root}>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 8) {
          errors.password = "Password must be at least 8 characters";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h3" color="initial">
            Login Page
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "2rem",
              marginTop: "2rem",
            }}
          >
            <TextField
              id="emailField"
              label="Email Address"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <TextField
              id="passwordField"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            ></TextField>
            {errors.password && touched.password && errors.password}
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </Container>
      )}
    </Formik>
  </Container>
);

export default function Login() {
  return (
    <Container className={styles.root}>
      <LoginForm />
    </Container>
  );
}
