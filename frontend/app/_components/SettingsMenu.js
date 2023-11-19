"use client";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from "next-auth/react";
// import { useState, useEffect  } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SettingsMenu({
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
  settings,
  onProfileClick,
}) {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push('/dashboard'); 
  };

  useEffect(() => {
    if (session && session.user) {
      setCurrentUser(session.user);
    }
  }, [session]);

  const handleMenuItemClick = (setting) => {
    if (setting === "Logout") {
      signOut({ redirect: false }).then(() =>
        //router.replace("http://159.223.47.93/")
        router.push('/')
      );
    } else if (setting === "Dashboard") {
      navigateToDashboard();
    }
    else if (setting === "Profile") {
      onProfileClick();
    }
    handleCloseUserMenu();
  };

  return (
    <>
      <IconButton
        disableRipple={true}
      // onClick={}
      ></IconButton>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="user avatar" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
            <Typography textAlign="center">
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <Typography variant="body1" color="inherited">
        {session ? session.user.name.toUpperCase() : ""}
      </Typography>
    </>
  );
}
