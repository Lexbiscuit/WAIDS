"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SettingsMenu from "./SettingsMenu";

// const BASE_URL = "http://localhost:3000/dashboard/";

const pages = ["Log Viewer", "IDS Sources", "Investigation", "Users", "Alerts", "History"];

const roleAccess = {
  'Network Administrator': ['Main Dashboard', 'IDS Sources', 'Log Viewer'],
  'SOC Analyst': ['Main Dashboard', 'Log Viewer', 'Investigation'],
  'IT Manager': ['Main Dashboard', 'Log Viewer', 'Investigation', 'IDS Sources'],
  'IR Team': ['Main Dashboard', 'Log Viewer', 'Investigation'],
  'Security Auditor': ['Log Viewer', 'Investigation'],
  'System Administrator': ['*'] 
};

export default function Appbar_auth() {
  const [state, setState] = useState({ left: false });
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  console.log(userRole)
  const allowedPages = roleAccess[userRole];
  
  let filteredPages = [];
  if (allowedPages) {
    filteredPages = pages.filter(page => allowedPages.includes(page) || allowedPages.includes('*'));
  }

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {filteredPages.map((page) => (
          <ListItem key={page} disablePadding>
            <ListItemButton href={`/${page.replace(" ", "").toLowerCase()}`}>
              <Typography variant="body1" color="inherit">
                {page}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop: WAIDS Logo and Title */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WAIDS
          </Typography>

          {/* Mobile: Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>

            <SwipeableDrawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              onOpen={toggleDrawer("left", true)}
            >
              {list("left")}
            </SwipeableDrawer>
          </Box>

          {/* Mobile: WAIDS Logo and Title*/}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            WAIDS
          </Typography>

          {/* Desktop: Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {filteredPages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                href={`/${page.replace(" ", "").toLowerCase()}`}
                sx={{ my: 2, mx: 1.5, display: "block" }}
              >
                <Typography variant="body1" color="black" textTransform="none">
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>

          {/* Mobile and Desktop: Settings Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <SettingsMenu
              handleOpenUserMenu={handleOpenUserMenu}
              anchorElUser={anchorElUser}
              handleCloseUserMenu={handleCloseUserMenu}
              settings={settings}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
