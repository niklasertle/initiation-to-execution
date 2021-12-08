import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Auth from "../../utils/auth";
import projects_pic from "../../images/projects_pic.png";
import { Link } from "react-router-dom";
const pages = ["Kanban", "Chat", "Settings"];

export default function TemporaryDrawer({ setCurrentPage }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        ml: 5,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => setCurrentPage(page)}
          sx={{ my: 2, color: "#082D56", display: "block" }}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="contained"
       
        sx={{ mb: 1, p: 1, mr: 3,  }}
        style={{ backgroundColor: "#082D56", color: "#FFFFFF" }}
        onClick={() => {
          window.location.replace("/");
        }}
      >
        {" "}
        Home
      </Button>
      <Button
        variant="contained"
        sx={{ mb: 1, p: 1, mr: 3,  }}
        style={{ backgroundColor: "#082D56", color: "#FFFFFF" }}
        onClick={() => {
          Auth.logout();
        }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <div>
      {["Menu"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            style={{
              backgroundColor: "#082D56",
              color: "#FFFFFF",
              backgroundImage: `url(${projects_pic})`,
              backgroundSize: "cover",
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
