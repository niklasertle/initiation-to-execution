import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ResponsiveAppBar from "../components/ProjectNavbar";
import { useParams } from "react-router-dom";
import Auth from "../utils/auth";
import Kanban from "../components/Kanban";
import Settings from "../components/Settings";
import ChatRoom from "../components/ChatRoom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT, GET_ME } from "../utils/queries";

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

  const { loading: userLoading, data: userData } = useQuery(GET_ME);

  // If the user data hasn't been returned yet return loading
  if (loading || userLoading) {
    return <h2>LOADING...</h2>;
  }

  // Renders the selected component
  function renderPage() {
    if (currentPage === "Kanban") {
      return <Kanban kanban={projectData.kanban} projectId={projectId} title={projectData.title}  description={projectData.description}/>;
    }
    if (currentPage === "Chat") {
      return <ChatRoom />;
    }
    if (currentPage === "Settings") {
      return <Settings users={projectData.users} projectId={projectId} />;
    }
  }


  if (Auth.isAllowedToView(projectData.users, userData.me._id)) {
    return (
      <>
        <div className="m-3 ">
          <ResponsiveAppBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* <h1>{projectData.title}</h1>
          <p>{projectData.description}</p> */}
        </div>
        <>{renderPage()}</>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}
