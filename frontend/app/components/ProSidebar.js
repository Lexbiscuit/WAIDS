"use client";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "@/app/theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PageList from "@/app/global/PageList";

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
  const [isCollapsed, setIsCollapsed] = useState(true);
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
      <Sidebar collapsed={isCollapsed} transitionDuration={600}>
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
                  Navigation
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

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {PageList.map((page) => (
              <Item
                title={page.name}
                to={page.href}
                icon={page.icon}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}
