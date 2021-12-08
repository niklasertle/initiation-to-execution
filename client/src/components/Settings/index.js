import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Button from "@mui/material/Button";

import {
  ADD_USER_TO_PROJECT,
  REMOVE_USER_FROM_PROJECT,
  DELETE_PROJECT,
} from "../../utils/mutations";
import { GET_ALL_USERS } from "../../utils/queries";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const card = (
  <React.Fragment>
    <CardContent>
      {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography> */}
      <Typography variant="h5" component="div">
        Important
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Deleting a user account will delete all save data associated to the
        account. Save data cannot be restored once it is deleted.
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function Settings({ users, projectId }) {
  // useState to update the list of users on the project
  const [projectUsers, setProjectUsers] = useState(users);

  // Form handlers
  const [newUser, setNewUser] = useState({ label: "", id: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Gets all the user
  const { data } = useQuery(GET_ALL_USERS);
  const userData = data?.users || [];

  // Mutation to add a user to the project
  const [addUser, { error }] = useMutation(ADD_USER_TO_PROJECT);
  const [removeUser] = useMutation(REMOVE_USER_FROM_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newUser) {
      setErrorMessage("Please enter a valid username");
      return;
    }

    try {
      const { data } = await addUser({
        variables: { projectId, userId: newUser.id },
      });

      setProjectUsers(data.addUserToProject.users);
      setNewUser({ label: "", id: "" });
    } catch (err) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const { data } = await removeUser({
        variables: { projectId, userId },
      });

      console.log(data);
      setProjectUsers(data.removeUserFromProject.users);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className="m-5">
      <h2 className="settings">Project Settings</h2>
      <div className="row">
        <div className="col-6">
          <h3 className="currentUser">
            <SupervisedUserCircleIcon /> Current users
          </h3>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              {card}
              <ul>
                {projectUsers.map((user) => {
                  return (
                    <li key={`${user._id}userList`}>
                      <p className="projUserName">
                        {user.username}
                        <Button
                          variant="light"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          X
                        </Button>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </Box>
        </div>
        <div className="col-6">
          <h3 className="currentUser m-3">
            <PersonIcon /> Add a user
          </h3>
          <div>
            <form className="form contact-form">
              <div className="form-group m-3">
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => setNewUser(value)}
                  getOptionLabel={(option) =>
                    option.label ? option.label : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.label}
                      </li>
                    );
                  }}
                  id="combo-box-demo"
                  options={userData.map((user) => {
                    return { label: user.username, id: user._id };
                  })}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="User" />
                  )}
                />
              </div>
              <div className="form-group m-4">
                <Button
                  style={{ backgroundColor: "#082D56", color: "#FFFFFF" }}
                  className="btn btn-primary"
                  type="button"
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
            {errorMessage && (
              <div className="m-4 text-danger">
                <h4>{errorMessage}</h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="deleteArea">
        <p className="dangerZone"> Danger Zone</p>
        <p>
          Once you delete a project, there is no going back. Please be certain.
        </p>
        <Button
          style={{ backgroundColor: "red", color: "#FFFFFF" }}
          onClick={async () => {
            await deleteProject({ variables: { projectId } });
            window.location.replace("/");
          }}
        >
          <DeleteIcon />
          Delete Project
        </Button>
      </div>
    </div>
  );
}
