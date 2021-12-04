import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

const pages = ["Kanban", "Chat", "Settings"];

const ResponsiveAppBar = ({ setCurrentPage }) => {
  return (
    <AppBar position="static"  style={{backgroundColor:"white"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button>
            <Link to="/" style={{ textDecoration: "none", color: "#082D56" }}>
              Home
            </Link>
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          
          </Box>
      
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                sx={{ my: 2, color: "#082D56", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* <div className="m-3">
      <Button>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
      </Button>
      <Button onClick={() => setCurrentPage("Kanban")}>Kanban</Button>
      <Button onClick={() => setCurrentPage("Chat")}>Chat</Button>
      <Button onClick={() => setCurrentPage("Settings")}>Settings</Button>
    </div> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
