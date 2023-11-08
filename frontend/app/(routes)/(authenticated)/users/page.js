"use client";
import { Box, TextField, Container, InputAdornment } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React, { useEffect } from "react";
import UsersTable from "@/app/_components/_users/UsersTable";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Users() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return; 
    }

    if (!session) {
      router.push('/login');
      return;
    }

    if (session.user.role !== 'System Administrator') {
      router.push('/unauthorized'); 
    }
  }, [session, status, router]);

  if (session && session.user.role === 'System Administrator') {
    return (
      <Box component="main" height="100vh" overflow="auto">
        <ResponsiveAppBar />
        <Container maxWidth="lg" sx={{ my: 2 }}>
          <UsersTable />
        </Container>
      </Box>
    );
  }

  return null; 
}
