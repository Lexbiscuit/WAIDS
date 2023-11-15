"use client";
import { Box, TextField, Container, InputAdornment } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React, { useEffect } from "react";
import LogviewerTable from "@/app/_components/_logviewer/LogviewerTable";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function LogView() {
  const allowedRoles = ['Network Administrator', 'SOC Analyst', 'IT Manager', 'IR Team', 'Security Auditor', 'System Administrator'];
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
 
    if (status === 'loading') {
      return; 
    }
  
    if (!session) {
      //router.push('/login'); 
      router.push('/'); 
      return;
    }
    
    if (!allowedRoles.includes(session.user.role)) {
      router.push('/dashboard'); 
    }
  }, [session, status, router]);

  if (session && allowedRoles.includes(session.user.role)) {
    return (
      <Box component="main" height="100vh" overflow="auto">
        <ResponsiveAppBar />
        <Container maxWidth="lg" sx={{ my: 2 }}>
          <LogviewerTable />
        </Container>
      </Box>
    );
  }

  return null; 
}
