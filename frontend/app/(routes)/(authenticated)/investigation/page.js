"use client";
import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import InvestigationTable from "@/app/_components/_investigation/InvestigationTable";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const InvestigationsPage = () => {
  const allowedRoles = ['SOC Analyst', 'IT Manager', 'IR Team', 'Security Auditor', 'System Administrator'];
  
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
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <InvestigationTable />
        </Container>
      </Box>
    );
  }

  return null; 
};

export default InvestigationsPage;
