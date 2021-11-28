import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { useMutation, useQuery } from "@apollo/client";
import ProjectCard from '../components/ProjectCard'

import Auth from "../utils/auth";

import { CREATE_PROJECT } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function Profile() {
  // useState to watch if the modal should be open
  const [open, setOpen] = useState(false);
  // useState for date forms
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState();

  // Gets the current users data
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  // Mutation to create a project
  const [createProject] = useMutation(CREATE_PROJECT);

  // Functions to help with modal open/close
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // When the form is submitted, takes data to pass into the mutation
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const projectData = {
      title: data.get("title"),
      description: data.get("description"),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };

    try {
      const { data } = await createProject({
        variables: projectData,
      });

      window.location.replace(`/project/${data.createProject._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // If the user data hasn't been returned yet return loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <>
        <h1>{userData.username}</h1>

        <Button onClick={handleOpen}>Create Project</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-size">
            <Box>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newStartDate) => {
                      setStartDate(newStartDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newEndDate) => {
                      setEndDate(newEndDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Project
                </Button>
              </Box>
            </Box>
          </div>
        </Modal>

        <Button
          onClick={() => {
            Auth.logout();
          }}
        >
          Logout
        </Button>
      </>
      <ProjectCard userId={userData._id}/>
    </>
  );
}
