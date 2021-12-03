import React, { useState } from "react";
import ProjectNavbar from "../components/ProjectNavbar";
import { useParams } from "react-router-dom";

import Kanban from "../components/Kanban";
import Settings from "../components/Settings";
import ChatRoom from "../components/ChatRoom";

import { useQuery } from "@apollo/client";

import { GET_PROJECT } from "../utils/queries";

export default function Projects() {
  // Gets the project ID from the parameters
  const { projectId } = useParams();

  // Used to send the proper component
  const [currentPage, setCurrentPage] = useState("Kanban");

  // Get the project data from the database using the project ID
  const { loading, data } = useQuery(GET_PROJECT, {
    variables: { projectId: projectId },
  });
  const projectData = data?.project || [];

  // If the user data hasn't been returned yet return loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Renders the selected component
  function renderPage() {
    if (currentPage === "Kanban") {
      return <Kanban kanban={projectData.kanban} projectId={projectId} />;
    }
    if (currentPage === "Chat") {
      return <ChatRoom />;
    }
    if (currentPage === "Settings") {
      return <Settings users={projectData.users} projectId={projectId} />;
    }
  }

  return (
    <>
      <div className="m-3 ">
        <ProjectNavbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <h1>{projectData.title}</h1>
        <p>{projectData.description}</p>
      </div>
      <>{renderPage()}</>
    </>
  );
}
