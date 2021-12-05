import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";
import {
  ADD_USER_TO_PROJECT,
  REMOVE_USER_FROM_PROJECT,
  DELETE_PROJECT,
} from "../../utils/mutations";
import { GET_ALL_USERS } from "../../utils/queries";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Tooltip } from "@mui/material";
import { Fade } from "@mui/material";

export default function Settings({ users, projectId, }) {
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
      
      setProjectUsers(data.addUserToProject.users)
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
      setProjectUsers(data.removeUserFromProject.users)
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className="m-5">
      <h2>Settings</h2>
      <div className="row">
        <div className="col-6">
          <h3>Current users</h3>
          <ul>
            {projectUsers.map((user) => {
              return (
                <li key={`${user._id}userList`}>
                  <p>{user.username}<Button variant="light" onClick={() => handleDeleteUser(user._id)}>X</Button></p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-6">
          <h3 className="m-3">Add a user</h3>
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
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
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
      <div>
      <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      title="Are you sure you want to delete this project?"
     >
        <Button
          onClick={async () => {
            await deleteProject({ variables: { projectId } });
            window.location.replace("/");
          }}
        >
          Delete Project
        </Button>
        </Tooltip>
      </div>
    </div>
  );
}
