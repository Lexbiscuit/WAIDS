import { Box, TextField, Container, InputAdornment } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React from "react";
import UsersTable from "@/app/_components/_users/UsersTable";

export default async function Users() {
  return (
    <Box component="main" height="100vh" overflow="auto">
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <UsersTable />
      </Container>
    </Box>
  );
}
