"use client";
import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import DisplaySources from "@/app/_components/_idssources/DisplaySources";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const IDSSourcesPage = () => {
  const allowedRoles = ['Network Administrator', 'IT Manager', 'System Administrator'];
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
   
    if (!allowedRoles.includes(session.user.role)) {
      router.push('/unauthorized'); 
    }
  }, [session, status, router]);

  if (session && allowedRoles.includes(session.user.role)) {
    return (
      <Box component="main" height="100vh" overflow="auto">
        <ResponsiveAppBar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <DisplaySources />
        </Container>
      </Box>
    );
  }

  return null; 
};

export default IDSSourcesPage;
