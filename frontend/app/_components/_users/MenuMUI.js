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
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [userStatus, setUserStatus] = React.useState(data.status || "active");

  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openSuspendDialog, setOpenSuspendDialog] = React.useState(false);

  const toggleUpdateDialog = () => {
    setOpenUpdateDialog(!openUpdateDialog);
  };

  const togglePasswordDialog = () => {
    setOpenPasswordDialog(!openPasswordDialog);
  };

  const toggleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const toggleSuspendDialog = () => {
    setOpenSuspendDialog(!openSuspendDialog);
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

      <PasswordFormDialog
        open={openPasswordDialog}
        toggleDialog={togglePasswordDialog}
        row={data}
        setChanged={setChanged}
      />

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        toggleDialog={toggleDeleteDialog}
        userId={data._id}
        setChanged={setChanged}
      />

      <SuspendConfirmationDialog
        open={openSuspendDialog}
        toggleDialog={toggleSuspendDialog}
        userId={data._id}
        setChanged={setChanged}
        userStatus={userStatus}
        setUserStatus={setUserStatus} // 
      />

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
              handleClose();
              toggleUpdateDialog();
            }
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            {
              handleClose();
              togglePasswordDialog();
            }

          }}
          disableRipple
        >
          <FileCopyIcon />
          Change Password
        </MenuItem>

        <MenuItem
          onClick={() => {
            {
              handleClose();
              if (userStatus === "active") {
                toggleSuspendDialog("suspend");
              } else {
                toggleSuspendDialog("active");
              }
            }
          }}
          disableRipple
        >
          <FileCopyIcon />
          {userStatus === "active" ? "Suspend" : "Suspend"}
        </MenuItem>
        {/* <Menu
          anchorEl={statusAnchorEl}
          open={Boolean(statusAnchorEl)}
          onClose={handleStatusMenuClose}
        >
          <MenuItem onClick={() => handleUserStatusChange('Active')}>Active</MenuItem>
          <MenuItem onClick={() => handleUserStatusChange('Suspend')}>Suspend</MenuItem>
        </Menu> */}

        <MenuItem
          onClick={() => {
            {
              handleClose();
              toggleDeleteDialog(); // Open the delete confirmation dialog
            }
          }}
          disableRipple
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

// For Admin to edit and update the users account
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
                await fetch("/api/users/UsersData", {
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

// For Admin to change the user account password
function PasswordFormDialog(props) {
  const { open, toggleDialog, row } = props;
  const [newPassword, setNewPassword] = React.useState("");

  const handleChangePassword = async () => {
    try {
      const response = await fetch("/api/users/UsersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: row._id,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (data.message === "Update successful.") {
        alert("Password updated successfully!");
        toggleDialog();  // Close the dialog
        location.reload();
      } else {
        alert("Error updating password.");
        location.reload();
      }
    } catch (error) {
      console.error("There was an error:", error);
      alert("Error updating password.");
    }
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="new-password"
          label="New Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button onClick={handleChangePassword}>Change Password</Button>
      </DialogActions>
    </Dialog>
  );
}

// For Admin to delete account
function DeleteConfirmationDialog(props) {
  const { open, toggleDialog, userId, setChanged } = props;

  const handleDelete = async () => {
    await fetch("/api/users/UsersData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Delete successful.") {
          alert("User deleted successfully.");
          setChanged(true);
        } else {
          alert("Error deleting user.");
        }
      })
      .catch((err) => alert(err));

    toggleDialog();
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// For Admin to add new account
export function AddUserDialog(props) {
  const { open, toggleDialog } = props;

  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [roleValue, setRoleValue] = React.useState("");

  const handleRoleChange = (event) => {
    setRoleValue(event.target.value);
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("/api/users/UsersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          role: roleValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.message === "User created successfully.") {
        alert("User added successfully!");
        toggleDialog();  // Close the dialog
        location.reload(); // Refresh the page
      } else {
        alert("Error adding user.");
      }
    } catch (error) {
      console.error("There was an error:", error);
      alert("Error adding user.");
    }
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the new user's details</DialogContentText>
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
            type="email"
            fullWidth
            variant="outlined"
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
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
              <MenuItem value={"Security Auditor"}>
                Security Auditor
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button onClick={handleAddUser}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

// Suspend Confirmation Dialog
function SuspendConfirmationDialog(props) {
  const { open, toggleDialog, userId, setChanged, userStatus, setUserStatus } = props;

  const handleStatusChange = async () => {
    await fetch("/api/users/UsersData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: userId, status: userStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User status updated successfully.") {
          if (userStatus === "suspended") {
            alert("User suspended successfully.");
          } else if (userStatus === "active") {
            alert("User has been unsuspended successfully.");
          }
          setChanged(true);
        }
        else {
          alert("Error updating user status.");
        }
      })
      .catch((err) => alert(err));

    toggleDialog();
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Change User Status</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select the desired status for this user:
        </DialogContentText>
        <FormControl fullWidth>
          <Select
            value={userStatus}
            onChange={(e) => setUserStatus(e.target.value)}
          >
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"suspended"}>Suspend</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button onClick={handleStatusChange} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}