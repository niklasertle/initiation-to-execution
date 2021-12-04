import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import { useMutation } from "@apollo/client";
import Editable from "../Editabled/Editable";
import Button from "@mui/material/Button";

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

  if (boards[1].cards.length === 0) {
    boards[1].cards.push({
      id: "temp1",
      title: "Drag a card here to see it function",
      status: "inprogress",
    });
  }

  if (boards[2].cards.length === 0) {
    boards[2].cards.push({
      id: "temp2",
      title: "Drag a card here to see it function",
      status: "done",
    });
  }

  return boards;
}

function Kanban({ kanban, projectId }) {
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
    console.log("Drag ended:", bid, "/", cid);
    console.log(targetCard);
    try {
      const { data } = await updateStatus({
        variables: {
          projectId,
          kanbanId: cid,
          status: bid,
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
    console.log("Drag start", bid, "/", cid);
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="kanbanBoard">
      <div className="app_nav"></div>
      <div className="app_boards_container">
        <h1 className="kanbanTitle">Kanban Board</h1>{" "}
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
              updateCard={updateCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Kanban;
