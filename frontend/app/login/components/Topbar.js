import { Box, IconButton, useTheme, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "@/app/theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { ImportContactsOutlined } from "@mui/icons-material";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{ boxShadow: 1 }}
    >
      <Box display="flex" backgroundColor="transparent" borderRadius="3px">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h1"
            color={colors.primary[100]}
            sx={{
              "&:hover *, &:hover": { color: "#868dfb !important" },
            }}
          >
            <SearchIcon
              sx={{
                transform: "scale(1.5)",
                marginRight: "0.3rem",
              }}
            />
            WAIDS
          </Typography>
        </Link>
      </Box>

      {/* ICONS */}
      <Box
        display="flex"
        sx={{
          "p.MuiTypography-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: ".2rem",
          },
          "button:hover p, button:hover svg": {
            color: "#868dfb",
          },
          a: {
            display: "flex",
            textDecoration: "none",
          },
        }}
      >
        <Link href="about">
          <IconButton disableRipple={true}>
            <Typography variant="body1" color={colors.primary[100]}>
              <LightbulbOutlinedIcon /> About Us
            </Typography>
          </IconButton>
        </Link>

        <Link href="contact">
          <IconButton disableRipple={true}>
            <Typography variant="body1" color={colors.primary[100]}>
              <ContactPageOutlinedIcon />
              Contact Us
            </Typography>
          </IconButton>
        </Link>

        <Link href="">
          <IconButton disableRipple={true}>
            <Typography variant="body1" color={colors.primary[100]}>
              <ImportContactsOutlined />
              Third Option
            </Typography>
          </IconButton>
        </Link>

        <IconButton disableRipple={true} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
