import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import PrivateRoute from "./PrivateRoutes";
import BootstrapNavbar from "./components/Navbar/Navbar";
import CreateProject from "./pages/CreateProject";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";

//KANBAN IMPORTS
import React, { useState, useEffect, useRef } from "react";
// import Board from "./components/Board/Board";
// import Editable from "./components/Editabled/Editable";
import "./App.css";

import Kanban from "./components/Kanban/Kanban";

//Chat Feature
import Chat from "../src/components/Chat/Chat";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
            <PrivateRoute exact path="*" />
          </Switch>
          
          <>
            <div>
              {/* <Projects /> */}
              <Chat />
            </div>
          </>
        </>

        <></>
      </Router>

      <div className="sections"></div>
    </ApolloProvider>
  );
}

export default App;
