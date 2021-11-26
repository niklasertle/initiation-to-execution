import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { CREATE_PROJECT } from "../utils/mutations";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";


export default function Profile() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState();

  const [createProject] = useMutation(CREATE_PROJECT);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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

  return (
    <>

      <h1>LOGGED IN LETS GO!!!</h1>

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

      <h1>LOGGED INTO PROFILE PAGE LETS GO!!!</h1>
  
    </>
  );
}
