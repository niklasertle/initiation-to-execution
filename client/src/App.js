import React from "react";
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
import "./App.css";
<<<<<<< HEAD
import Kanban from "../src/components/Kanban/index";
import ChatTime from "../src/components/ChatRoom/index";
=======
>>>>>>> 8926c6d09ffd2aabf419e4c1a45654b84b747c78

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
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
