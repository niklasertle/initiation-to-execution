import React from "react";
import { Button } from "react-bootstrap";

export default function ProjectNavbar({ setCurrentPage }) {
  return (
    <>
      <Button onClick={() => setCurrentPage("Kanban")}>Kanban</Button>
      <Button onClick={() => setCurrentPage("Messages")}>Messages</Button>
      <Button onClick={() => setCurrentPage("Settings")}>Settings</Button>
    </>
  );
}
