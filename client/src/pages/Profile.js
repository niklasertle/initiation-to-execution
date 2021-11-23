import React from "react";
import Button from "@mui/material/Button";
import Auth from "../utils/auth";

export default function Profile() {
  return (
    <>
      <h1>LOGGED IN LETS GO!!!</h1>
      <Button
        onClick={() => {
          Auth.logout();
        }}
      >
        Logout
      </Button>
    </>
  );
}
