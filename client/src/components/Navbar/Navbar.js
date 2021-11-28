import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function ProjectNavbar({ setCurrentPage }) {
  return (
    <>
      <Button onClick={() => setCurrentPage("Calendar")}>Calendar</Button>
      <Button onClick={() => setCurrentPage("KhanBan")}>Khan Ban</Button>
      <Button onClick={() => setCurrentPage("Messages")}>Messages</Button>
      <Button onClick={() => setCurrentPage("Settings")}>Settings</Button>
    </>
  );
}

// class BootstrapNavbar extends React.Component {
//   render() {
//     return (
//       <div>
//         <div className="row">
//           <div className="col-md-12">
//             <Router>
//               <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
//                 <Navbar.Collapse id="basic-navbar-nav">
//                   <Nav className="mr-auto">
//                     <Nav.Link href="/Calendar">Calendar </Nav.Link>
//                     <Nav.Link href="/KhanBan">Khan Ban </Nav.Link>
//                     <Nav.Link href="/Messages">Chat </Nav.Link>
//                     <Nav.Link href="/Settings">Settings </Nav.Link>
//                   </Nav>
//                 </Navbar.Collapse>
//               </Navbar>
//               <br />
//               <Switch>
//                 <Route exact path="/"></Route>
//                 <Route path="/Projects">
//                   <Projects />
//                 </Route>
//                 <Route path="/Calendar">
//                   <Calendar />
//                 </Route>
//                 <Route path="/Messages">
//                   <Messages />
//                 </Route>
//               </Switch>
//             </Router>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default BootstrapNavbar;
