import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { GET_ALL_PROJECTS } from "../../utils/queries";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProjectCard({ userId }) {
    // Get all the project data for the user
  const { loading, data } = useQuery(GET_ALL_PROJECTS, {
    variables: { userId: userId },
  });
  const projectData = data?.projects || [];

  // If it hasn't returned yet return this
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <h1> Your Projects</h1>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {projectData.map((project) => {
          return (
            <Item key={project._id}>
              <Link to={() => `/project/${project._id}`}>
                <h2>{project.title}</h2>
              </Link>
              <p>{project.description}</p>
            </Item>
          );
        })}
      </Stack>
    </>
  );
}
