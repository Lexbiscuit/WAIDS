"use client";
import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "@/app/_components/Appbar_no_auth";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/WaidsLogo.png";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    mutate: signInMutation,
    status,
    isPending,
  } = useMutation({
    mutationFn: async (values) => {
      return signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
    },
    onSuccess: (res) => {
      if (res.error) {
        console.log(res);
        alert("Invalid username or password.");
      } else {
        alert("Login successful.");
        router.push("/dashboard");
      }
    },
    onError: () => {
      alert("An error has occurred. Please try again later.");
    },
  });
  //
  // useEffect(() => {
  //   if (session) {
  //     router.push("/dashboard");
  //   }
  // }, [session]);

  // const [submitting, setSubmitting] = useState(false);

  // const toggleSubmitting = () => setSubmitting(!submitting);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      signInMutation(values);
      // setSubmitting(1);
      // const result = await signIn("credentials", {
      //   email: values.email,
      //   password: values.password,
      //   redirect: false,
      // });
      //
      // if (result.error) {
      //   alert("Login failed");
      //   toggleSubmitting();
      // } else {
      //   router.push("/dashboard");
      // }
    },
  });

  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "16px", // Adjust margin as needed
              }}
            >
              <Image
                unoptimized
                src={logo}
                alt="WAIDS LOGO"
                style={{ width: "90%", height: "auto" }}
              />
            </div>
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
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="http://159.223.47.93/support" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});
