"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function MenuMUI({ row, setChanged }) {
  const data = row.original;

  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = React.useState(false);

  const toggleUpdateDialog = () => {
    setOpenUpdateDialog(!openUpdateDialog);
  };

  const togglePasswordDialog = () => {
    setOpenPasswordDialog(!openPasswordDialog);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <UpdateFormDialog
        open={openUpdateDialog}
        toggleDialog={toggleUpdateDialog}
        row={data}
        setChanged={setChanged}
      />

      {/* <PasswordFormDialog
        open={openPasswordDialog}
        toggleDialog={togglePasswordDialog}
        row={data}
        setChanged={setChanged}
      /> */}

      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            {
              /* Edit Details*/
            }
            handleClose();
            toggleUpdateDialog();
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            {
              /*Change Password*/
            }
            handleClose();
          }}
          disableRipple
        >
          <FileCopyIcon />
          Change Password
        </MenuItem>

        <MenuItem
          onClick={() => {
            {
              /*Suspend Account*/
            }
            handleClose();
          }}
          disableRipple
        >
          <FileCopyIcon />
          Suspend
        </MenuItem>

        <MenuItem
          onClick={() => {
            {
              /*Delete User*/
            }
            handleClose();
          }}
          disableRipple
        >
          <FileCopyIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

function UpdateFormDialog(props) {
  const { open, toggleDialog, row } = props;

  const [nameValue, setNameValue] = React.useState(row.name);
  const [emailValue, setEmailValue] = React.useState(row.email);
  const [roleValue, setRoleValue] = React.useState(row.role);

  const handleRoleChange = (event) => {
    setRoleValue(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the user's details</DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30rem",
              gap: "1rem",
            }}
          >
            <TextField
              margin="dense"
              id="ID"
              label="_id"
              type="text"
              fullWidth
              variant="outlined"
              value={row._id}
              disabled
            />

            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />

            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
            />

            <FormControl fullWidth sx={{ mt: "5px" }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role"
                value={roleValue}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value={"System Administrator"}>
                  System Administrator
                </MenuItem>
                <MenuItem value={"SOC Analyst"}>SOC Analyst</MenuItem>
                <MenuItem value={"IR Team"}>IR Team</MenuItem>
                <MenuItem value={"IT Manager"}>IT Manager</MenuItem>
                <MenuItem value={"Network Administrator"}>
                  Network Administrator
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Cancel</Button>
          <Button
            onClick={() => {
              async function sendData() {
                await fetch("http://localhost:3000/api/users/UsersData", {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({
                    _id: row._id,
                    name: nameValue,
                    email: emailValue,
                    role: roleValue,
                  }),
                })
                  .catch((err) => alert(err))
                  .then(() => alert("Details successfully changed."));
              }

              toggleDialog();
              sendData();
              props.setChanged(true);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
