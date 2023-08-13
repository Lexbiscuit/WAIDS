import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { ColorModeContext, tokens } from "@/app/theme";
import PageList from "@/app/global/PageList";

const Topbar = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{ boxShadow: 1 }}
    >
      {/* <Box display="flex" backgroundColor="transparent" borderRadius="3px"> */}
      <IconButton disableRipple={true} href="/" sx={{}}>
        <Typography
          variant="h1"
          color={colors.primary[100]}
          fontSize="1.6rem"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            "&:hover *, &:hover": { color: "#868dfb !important" },
          }}
        >
          <SearchIcon /> WAIDS
        </Typography>
      </IconButton>
      {/* </Box> */}

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
          "button:hover p, button:hover svg, a:hover p, a:hover svg": {
            color: "#868dfb",
          },
          a: {
            display: "flex",
            textDecoration: "none",
          },
        }}
      >
        {isDesktop && (
          <>
            {PageList.map(function (page) {
              return (
                <IconButton
                  disableRipple={true}
                  href={page.href}
                  key={page.name}
                >
                  <Typography variant="body1" color={colors.primary[100]}>
                    {page.icon} {page.name}
                  </Typography>
                </IconButton>
              );
            })}
          </>
        )}

        <IconButton disableRipple={true} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Button variant="outlined" color="primary" href="/login">
          <Typography variant="body1" color={colors.primary[100]}>
            Login
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
