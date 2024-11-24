'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

const SideBar = () => {
  const router = useRouter();


  const getSelectedTab = () => {
    if (router.pathname === "/") return "Dashboard";
    if (router.pathname === "/Invoice") return "Invoices";
    if (router.pathname === "/Vendors") return "Vendors";
    if (router.pathname === "/Settings") return "Settings";
    return "";
  };

  const [selectedTab, setSelectedTab] = useState(getSelectedTab());


  useEffect(() => {
    setSelectedTab(getSelectedTab());
  }, [router.pathname]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f7f8fc", 
        },
      }}
    >
      <Image
        src="/finifi_logo.jpeg"
        alt="Logo"
        width={100}
        height={100}
        style={{ marginLeft: "60px", color: "#f7f8fc" }}
      />
      <Toolbar />

      <div>
        <List>
          <ListItem
            selected={selectedTab === "Dashboard"}
            sx={{
              backgroundColor: selectedTab === "Dashboard" ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <ExploreOutlinedIcon sx={{ color: selectedTab === "Dashboard" ? "#1976d2" : "#A9A9A9" }} />
            </ListItemIcon>
            <Link href="/">
              <ListItemText primary="Dashboard" />
            </Link>
          </ListItem>


          <ListItem
            selected={selectedTab === "Invoices"}
            sx={{
              backgroundColor: selectedTab === "Invoices" ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <InsertDriveFileOutlinedIcon sx={{ color: selectedTab === "Invoices" ? "#08306b" : "#A9A9A9" }} />
            </ListItemIcon>
            <Link href="/Invoice">
              <ListItemText primary="Invoices" />
            </Link>
          </ListItem>


          <ListItem
            selected={selectedTab === "Vendors"}
            sx={{
              backgroundColor: selectedTab === "Vendors" ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: selectedTab === "Vendors" ? "#1976d2" : "#A9A9A9" }} />
            </ListItemIcon>
            <Link href="/Vendors">
              <ListItemText primary="Vendors" />
            </Link>
          </ListItem>


          <ListItem
            selected={selectedTab === "Settings"}
            sx={{
              backgroundColor: selectedTab === "Settings" ? "#e0e0e0" : "transparent",
            }}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ color: selectedTab === "Settings" ? "#1976d2" : "#A9A9A9" }} />
            </ListItemIcon>
            <Link href="/Settings">
              <ListItemText primary="Settings" />
            </Link>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
