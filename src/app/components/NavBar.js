// components/NavBar.js
"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff", 
        color: "#000000", 
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <Typography
          paddingLeft="270px"
          variant="h6"
          noWrap
          sx={{
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Manage Invoices
        </Typography>


        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>


          <IconButton onClick={handleMenuOpen}>
            <Avatar
              sx={{
                bgcolor: "#0277bd", 
              }}
              src="/static/images/avatar/1.jpg" 
              alt="User Profile"
            />
          </IconButton>


          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: "40px" }}
          >
            <MenuItem disabled>
              <Typography variant="subtitle1" fontWeight="bold">
                Rohit Sharma
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
