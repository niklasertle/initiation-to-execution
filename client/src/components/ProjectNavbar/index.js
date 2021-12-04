// import React from "react";
// import { Link } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Button from "@mui/material/Button";

// const pages = ["Kanban", "Chat", "Settings"];

// const ResponsiveAppBar = ({ setCurrentPage }) => {
//   return (
//     <AppBar position="static"  style={{backgroundColor:"white"}}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Button>
//             <Link to="/" style={{ textDecoration: "none", color: "#082D56" }}>
//               Home
//             </Link>
//           </Button>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
          
//           </Box>
      
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 sx={{ my: 2, color: "#082D56", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           {/* <div className="m-3">
//       <Button>
//         <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
//       </Button>
//       <Button onClick={() => setCurrentPage("Kanban")}>Kanban</Button>
//       <Button onClick={() => setCurrentPage("Chat")}>Chat</Button>
//       <Button onClick={() => setCurrentPage("Settings")}>Settings</Button>
//     </div> */}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default ResponsiveAppBar;




import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Auth from "../../utils/auth"


const pages = ["Kanban", "Chat", "Settings"];



export default function TemporaryDrawer({setCurrentPage}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
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
            sx={{ mb: 1, p: 1, mr: 3 }}
            style={{ backgroundColor: "#082D56", color: "#FFFFFF" }}
            onClick={() => {
              Auth.logout();
            }}
          >
            Logout
          </Button>
      <List>
      
      </List>
      <Divider />
      
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}