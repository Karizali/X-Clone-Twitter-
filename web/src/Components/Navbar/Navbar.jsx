import * as React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  styled, alpha, AppBar,
  Box, Toolbar, IconButton,
  Typography, InputBase, Badge,
  MenuItem, Menu, Paper, Button
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import XIcon from '@mui/icons-material/X';
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import Person2Icon from '@mui/icons-material/Person2';
import { GlobalContext } from './../Context/Context';
import { useContext } from "react";
import axios from "axios";




export default function PrimarySearchAppBar() {

  let { state, dispatch } = useContext(GlobalContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${state.baseUrl}/api/v1/logout`
      );


      dispatch({
        type: 'USER_LOGOUT'
      })

      // setUser(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
      // setError(error?.response?.data?.message);
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link style={{ textDecoration: "none", color: "black" }} to={"change-password"}>
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <LockIcon />
          </IconButton>
          <p>Change Password</p>
        </MenuItem>
      </Link>
      <Link style={{ textDecoration: "none", color: "black" }} to={"login"}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <LogoutOutlined />
          </IconButton>
          <p onClick={logoutHandler}>Logout</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className="headerContainer">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          sx={{
            background: "#F7F8F8",
            boxShadow: "none",
            padding: "0 0 4px 0",
          }}
        >

          <Toolbar sx={{ padding: "0", margin: "0", display: "flex", justifyContent: "space-between" }}>

            <Toolbar>
              <XIcon sx={{ color: "black" }} />


            </Toolbar>
            <Toolbar>

              <Typography sx={{ color: "black", textTransform: "capitalize", }}>
                {state?.user?.firstName}
              </Typography>
              <Person2Icon sx={{ color: "black" }} />
              <div className="hidden">

                <Link style={{ textDecoration: "none", color: "black" }} to={"change-password"}>
                  <Button sx={{ marginLeft: "1rem" }} variant="contained">Change Password</Button>
                </Link>
                <Button onClick={logoutHandler} sx={{ marginLeft: "1rem" }} variant="contained">Logout</Button>
              </div>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon sx={{ color: "black" }} />
                </IconButton>
              </Box>

            </Toolbar>

          </Toolbar>

        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}
