"use client";

import { Container, Typography, TextField, Button } from "@mui/material";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import NavBar from "@/app/components/NavBar.js";
const submitForm = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/login", {
      email: `${data.email}`,
      password: `${data.password}`,
    });
    console.log(response.data);
  } catch (error) {
    // console.error(error);
  }
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [submitStatus, setSubmitStatus] = useState(false);

  const onSubmit = (data) => {
    setSubmitStatus(true);
    submitForm(data);
    setSubmitStatus(false);
  };

  return (
    <>
      <NavBar />
      <Container className={styles.root}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            variant="outlined"
            label="Email Address"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S{2,}$/i,
            })}
          />
          {errors.email?.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.email?.type === "pattern" && (
            <span>Invalid email address</span>
          )}

          <TextField
            variant="outlined"
            label="Password"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password?.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span>Password must be at least 8 characters</span>
          )}

          <Button
            variant="outlined"
            type="submit"
            disabled={submitStatus == true}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            type="reset"
            disabled={submitStatus == true}
          >
            Reset
          </Button>
        </form>
      </Container>
    </>
  );
}
