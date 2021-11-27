// import { Modal } from 'bootstrap'
import React from "react";
import Modal from "../../Modal/Modal";

function CardInfo(props) {
  return (
    <div>
      <Modal onClose={() => props.onClose()}>
        <h1>Hi there!</h1>{" "}
      </Modal>
    </div>
  );
}

export default CardInfo;
