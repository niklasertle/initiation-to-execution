import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./utils/auth";

import Profile from "./pages/Profile";
import Projects from './pages/Projects'

export default function PrivateRoute() {
  if (Auth.loggedIn()) {
    return (
      <>
        <Route exact path="/" component={Profile}/>
        <Route exact path="/project/:projectId" component={Projects}/>
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
}
