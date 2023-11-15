"use client";
import { Box, TextField, Container, InputAdornment } from "@mui/material";
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import React, { useState, useEffect } from 'react';
import UsersTable from "@/app/_components/_users/UsersTable";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import UserProfile from '../../../_components/_users/UserProfile';

export default function Users() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push('/');
      return;
    }

    if (session.user.role !== 'System Administrator') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  // const handleOpenProfile = () => {
  //   setShowProfile(true);
  // };

  if (session && session.user.role === 'System Administrator') {
    return (
      <Box component="main" height="100vh" overflow="auto">
        <ResponsiveAppBar />
        <Container maxWidth="lg" sx={{ my: 2 }}>
          {showProfile && <UserProfile />}
          {/* Render UsersTable only if the user is a System Administrator */}
          {session.user.role === 'System Administrator' && <UsersTable />}
        </Container>
      </Box>
    );
  }

  return null;
}
