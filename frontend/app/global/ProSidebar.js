"use client";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { tokens } from "@/app/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      href={to}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default function ProSidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        ".ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        ".ps-sidebar-root": {
          borderColor: "transparent !important",
          height: "100% !important",
        },
        ".ps-menu-button:hover": {
          backgroundColor: "transparent !important",
        },
        ".ps-menu-button:hover .ps-menu-label, .ps-menu-button:hover .ps-menu-icon":
          {
            color: "#868dfb !important",
          },
        ".ps-menu-button": {
          padding: "5px 35px 5px 20px !important",
        },
        ".ps-menu-button.ps-active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        breakPoint={typeof window !== "undefined" ? "md" : undefined}
        transitionDuration={600}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent !important",
                      color: "#868dfb  !important",
                    },
                  }}
                >
                  WAIDS
                </Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent !important",
                      color: "#868dfb  !important",
                    },
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={``}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> */}
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Lexus
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Network Administrator
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}
