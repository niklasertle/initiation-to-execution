import React, { useState } from "react";
import ProjectNavbar from "../components/ProjectNavbar/Navbar";

import Kanban from "../components/Kanban";
import Messages from "../components/Messages";
import Settings from "../components/Settings";

export default function Projects() {
  const [currentPage, setCurrentPage] = useState("KhanBan");

  function renderPage() {
    if ((currentPage === "Kanban")) {
      return <Kanban />;
    }
    if ((currentPage === "Messages")) {
      return <Messages />;
    }
    if ((currentPage === "Settings")) {
      return <Settings />;
    }
  }

  return (
    <>
      <ProjectNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <h1>PROJECT TITLE HERE</h1>
      {renderPage()}
    </>
  );
}
