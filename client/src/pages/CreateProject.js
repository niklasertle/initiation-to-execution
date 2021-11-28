import React from "react";
import { Navbar } from "react-bootstrap";
import Projects from "./Projects";
import BootstrapNavbar from "../components/Navbar/Navbar";


export default function CreateProject() {
    return (
      <>
      <BootstrapNavbar />
        <h1>Create a Project Page!!!</h1>
        <Projects />
        
        </>
        
    );
  }