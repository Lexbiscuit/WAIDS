import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Slide,
    Grid,
    TextField,
    Button,
    Box,
    IconButton,
    Tooltip,
    Collapse
} from '@mui/material';
import PasswordStrengthBar from 'react-password-strength-bar';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSession } from "next-auth/react";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserProfile = ({ open, onClose }) => {
    const { data: session } = useSession();
    const user = session?.user;
    const userId = session?.user?._id;
    const isSystemAdmin = user?.role === 'System Administrator';
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")
    const passwordRequirementMessage = "Password must be at least 8 characters long and must contain at least one uppercase letter, symbol, and number. Eg: Password@2";
    const [showChangePassword, setShowChangePassword] = useState(false);

    const toggleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
    };

    const resetForm = () => {
        setNewPassword("");
        setConfirmPassword("");
        setMessage("");
    };

    const handleClose = () => {
        resetForm();
        setShowChangePassword(false);
        if (onClose) {
            onClose();
        }
    };

    // Function to fetch user details
    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/users/UsersData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userDetails = await response.json();
            const currentUser = userDetails.find(u => u._id === user);
            setUser(currentUser);

        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Function to handle password change
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch("/api/users/UsersData", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newPassword: newPassword,
                    _id: userId
                }),
            });

            const data = await res.json();
            if (data.message === "Password update successful.") {
                setMessage("Password updated successfully!");
            }
            // else if (data.message === "Cannot use previous password") {
            //     setMessage("You cannot use a previously used password.");
            // }
            else {
                setMessage(data.message || "Password requirement is not met.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setMessage("Error updating password.");
        }
    };

    return (
        <div>
            <Dialog open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullWidth={true}
                maxWidth="md"
                PaperProps={{
                    style: {
                        minHeight: '20vh',
                        width: '80%',
                    },
                }}>
                <DialogTitle id="user-profile-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '2.2rem', color: 'grey.800' }}>
                        {"My Profile"}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[600],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: '1.1rem', mb: 1, color: 'grey.700' }}>
                            Name: <span style={{ fontWeight: 'normal' }}>{user.name}</span>
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: '1.1rem', mb: 1, color: 'grey.700' }}>
                            Email: <span style={{ fontWeight: 'normal' }}>{user.email}</span>
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: '1.1rem', mb: 1, color: 'grey.700' }}>
                            Role: <span style={{ fontWeight: 'normal' }}>{user.role}</span>
                        </Typography>
                    </Box>

                    {!isSystemAdmin && (
                        <Box sx={{ mb: 2 }}>
                            <Button
                                startIcon={<ExpandMoreIcon />}
                                onClick={toggleChangePassword}
                                sx={{ textTransform: 'none', fontSize: '1.0rem', }}
                            >
                                Change Password
                            </Button>
                            <Collapse in={showChangePassword}>
                                {/* Password change form */}
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Tooltip
                                                title={<Typography sx={{ fontSize: '0.8rem' }}>{passwordRequirementMessage}</Typography>}
                                                placement="top"
                                                PopperProps={{
                                                    sx: {
                                                        fontSize: '1rem',
                                                        '& .MuiTooltip-tooltip': {
                                                            padding: '14px',
                                                        },
                                                    },
                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="New Password"
                                                    type="password"
                                                    id="newPassword"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    sx={{ mb: 2 }}
                                                />
                                                <Box sx={{ height: '10px', '& .react-password-strength-bar': { height: '100%' } }}>
                                                    <PasswordStrengthBar password={newPassword} />
                                                </Box>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Confirm New Password"
                                                type="password"
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                sx={{ mb: 2 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {message && <Typography color="error">{message}</Typography>}
                                </form>
                            </Collapse>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserProfile;