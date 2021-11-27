// import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React, { useState } from "react";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import PrivateRoute from "./PrivateRoutes";
import BootstrapNavbar from "./components/Navbar/Navbar";
import CreateProject from "./pages/CreateProject";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";

//KANBAN IMPORTS
import "./App.css";
import Board from "./components/Board/Board";
import Editable from "./components/Editable/Editable";

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
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Card 1",
          tasks: [],
          labels: [
            {
              text: "frontend",
              color: "blue",
            },
          ],
          desc: "testing the kanban on app.js",
          date: "",
        },
        {
          id: Date.now() + Math.random(),
          title: "Card 2",
          tasks: [],
          labels: [
            {
              text: "backend",
              color: "gray",
            },
          ],
          desc: "testing 2 the kanban on app.js",
          date: "",
        },
      ],
    },
  ]);

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ]);
  };

  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid);

    setBoards(tempBoards);
  };

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
              <Projects />
            </div>
          </>
        </>
      </Router>

      <div className="app">
        <div className="app_nav">
          <h1>Kanban Board</h1>
        </div>
        <div className="app_boards_container">
          <div className="app_boards">
            {boards.map((item) => (
              <Board key={item.id} board={item}
                removeBoard={removeBoard}
                addCard={addCard}
                removeCard={removeCard}
              />
            ))}
            <div className="app_boards_board">
              <Editable
                displayClass="app_boards_board_add"
                text="Add Board"
                placeholder="Enter board title"
                onSubmit={(value) => addBoard(value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sections"></div>
    </ApolloProvider>
  );
}

export default App;
