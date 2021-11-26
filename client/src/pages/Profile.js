import React from "react";
import Button from "@mui/material/Button";
import Auth from "../utils/auth";
import Projects from "./Projects";
import "../pages/CreateProject";
import CreateProject from "../pages/CreateProject";


export default function Profile() {
  return (
    <>
      <Button href="CreateProject" variant="contained">Create Project
      </Button>
      <Button variant="contained"
        onClick={() => {
          Auth.logout();
        }}
      >
        Logout
      </Button>

      <h1>LOGGED INTO PROFILE PAGE LETS GO!!!</h1>
  
    </>
  );
}
