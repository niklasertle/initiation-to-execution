import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProjectNavbar({ setCurrentPage }) {
  return (
    <div className="m-3">
      <Button>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
      </Button>
      <Button onClick={() => setCurrentPage("Kanban")}>Kanban</Button>
      <Button onClick={() => setCurrentPage("Chat")}>Chat</Button>
      <Button onClick={() => setCurrentPage("Settings")}>Settings</Button>
    </div>
  );
}
