import React, { useState } from "react";
import Board from "../Board";
import { useMutation } from "@apollo/client";
import Editable from "../Editabled/Editable";
import Button from "@mui/material/Button";
import ProjectCard from "../ProjectCard";


import {
  ADD_KANBAN,
  UPDATE_KANBAN_STATUS,
  DELETE_KANBAN,
} from "../../utils/mutations";

function loadKanban(kanban) {
  const boards = [
    {
      id: "todo",
      title: "To-Do",
      cards: [],
    },
    {
      id: "inprogress",
      title: "In-Progress",
      cards: [],
    },
    {
      id: "done",
      title: "Done",
      cards: [],
    },
  ];

  kanban.forEach((element) => {
    if (element.status === "todo") {
      boards[0].cards.push(element);
    } else if (element.status === "inprogress") {
      boards[1].cards.push(element);
    } else if (element.status === "done") {
      boards[2].cards.push(element);
    }
  });

  if (boards[0].cards.length === 0) {
    boards[0].cards.push({
      _id: "temp2",
      title: "Try adding a card to the board",
      status: "todo",
    });
  }

  if (boards[1].cards.length === 0) {
    boards[1].cards.push({
      _id: "temp1",
      title: "Drag a card here to see it function",
      status: "inprogress",
    });
  }

  if (boards[2].cards.length === 0) {
    boards[2].cards.push({
      _id: "temp2",
      title: "Drag a card here to see it function",
      status: "done",
    });
  }

  return boards;
}

function Kanban({ kanban, projectId, title, description }) {
  const [boards, setBoards] = useState(loadKanban(kanban));

  const [addCard] = useMutation(ADD_KANBAN);
  const [deleteCard] = useMutation(DELETE_KANBAN);
  const [updateStatus] = useMutation(UPDATE_KANBAN_STATUS);

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addCardHandler = async (title) => {
    try {
      const { data } = await addCard({
        variables: { projectId, title, status: "todo" },
      });
      setBoards(loadKanban(data.addKanban.kanban));
    } catch (error) {
      console.error(error);
    }
  };

  const removeCard = async (cardId) => {
    try {
      const { data } = await deleteCard({
        variables: { projectId, kanbanId: cardId },
      });
      setBoards(loadKanban(data.deleteKanban.kanban));
    } catch (error) {
      console.error(error);
    }
  };

  const dragEnded = async (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item._id === cid
    );

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);

    try {
      const { data } = await updateStatus({
        variables: {
          projectId,
          kanbanId: boards[s_boardIndex].cards[s_cardIndex]._id,
          status: boards[t_boardIndex].id,
        },
      });
      setBoards(loadKanban(data.updateKanbanStatus.kanban));

      setTargetCard({
        bid: "",
        cid: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  return (
    <div className="kanbanBoard">
      <div className="app_nav"></div>
      <div className="app_boards_container">
        <h1 className="kanbanTitle">{title}</h1>
        <p >{description} </p>
        <Button>
          <Editable
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board_add-card"
            editClass="board_add-card_edit"
            onSubmit={(value) => addCardHandler(value)}
          />
        </Button>
        <div className="app_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Kanban;
