import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

import Projects from '../../pages/Projects';
import Calendar from '../../pages/Calendar';
import Messages from '../../pages/Messages';

class BootstrapNavbar extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                        
                               
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                                           
                                    <Nav.Link href="/Calendar">Calendar </Nav.Link>
                                    <Nav.Link href="/Messages">Chat </Nav.Link>
                                    </Nav>
                                   
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                  
                                </Route>
                                <Route path="/Projects">
                                    <Projects /> 
                                </Route>
                                <Route path="/Calendar">
                                    <Calendar /> 
                                </Route>
                                <Route path="/Messages">
                                    <Messages /> 
                                </Route>
                               
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;