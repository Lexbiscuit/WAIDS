import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function SettingsMenu({
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
  settings,
}) {
  const { data: session, status } = useSession();
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
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography
              textAlign="center"
              onClick={() => {
                if (setting === "Logout") {
                  signOut({ callbackUrl: `${window.location.origin}/login` });
                }
              }}
            >
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
