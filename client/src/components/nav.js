import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    //navigate('/signup');
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e)=>{
    setAnchorEl(e.currentTarget);
  }

  const handleClose = (e)=>{
    setAnchorEl(null);
  }
  const handleCloseForPages = (page)=>{
    if(page=="logout"){
      localStorage.clear();
      return;
    }

    navigate('/'+page);
    console.log("/" + page );
    setAnchorEl(null);
  }
  

  return (
    <AppBar sx={{ px: { xs: 0, sm: 3, lg: 10 }, position: "relative" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Button key="logobtn">
            <DashboardIcon sx={{ color: "white", fontSize: "45px" }} />
          </Button>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Button component="button" sx={{ textTransform: "none" }}>
              <Typography
                component="p"
                px={1}
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                DashBoard
              </Typography>
            </Button>
          </Link>
        </Box>

        <Box key="links" sx={{ ml: 7, display: { xs: "none", md: "flex" } }}>
          {auth
            ? [
                <Link key="home" to="/" style={{ textDecoration: "none" }}>
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Home
                    </Typography>
                  </Button>
                </Link>,
                <Link
                  key="report"
                  to="/viewreport"
                  style={{ textDecoration: "none" }}
                >
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      View Report
                    </Typography>
                  </Button>
                </Link>,

                <Link
                  key="logout"
                  onClick={logout}
                  to="/login"
                  style={{ textDecoration: "none" }}
                >
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <PersonIcon sx={{ color: "white" }} />
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Log Out
                    </Typography>
                  </Button>
                </Link>,
              ]
            : [
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Login
                    </Typography>
                  </Button>
                </Link>,

                <Link
                  key="signup"
                  to="/signup"
                  style={{ textDecoration: "none" }}
                >
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Sign Up
                    </Typography>
                  </Button>
                </Link>,
              ]}
        </Box>

        {/*  Mobile Responsive code below  */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <IconButton onClick={handleOpen}>
            <MenuIcon sx={{ color: "white", fontSize: "34px" }} />
          </IconButton>

          <Paper>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {auth
                ? [
                    <MenuItem
                      key="Home"
                      onClick={() => handleCloseForPages("")}
                    >
                      Home
                    </MenuItem>,
                    <MenuItem
                      key="viewreport"
                      onClick={() => handleCloseForPages("viewreport")}
                    >
                      View Report
                    </MenuItem>,
                  
                    <MenuItem
                      key="logoutproducts"
                      onClick={() => handleCloseForPages("logout")}
                    >
                      Log Out
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="login"
                      onClick={() => handleCloseForPages("login")}
                    >
                      Login
                    </MenuItem>,
                    <MenuItem
                      key="signup"
                      onClick={() => handleCloseForPages("signup")}
                    >
                      Sign Up
                    </MenuItem>,
                  ]}
            </Menu>
          </Paper>
        </Box>

        <Box
          key="boxbtns"
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <IconButton key="IconButton" sx={{ mr: 0 }}>
            <DashboardIcon sx={{ color: "white", fontSize: "35px" }} />
          </IconButton>

          <Button
            key="DashBoardbtn"
            component="button"
            sx={{ m: 0, textTransform: "none" }}
          >
            <Typography
              key="pbtn"
              component="p"
              px={1}
              variant="h6"
              sx={{
                m: 0,
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              DashBoard
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
