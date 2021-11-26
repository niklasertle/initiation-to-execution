import React from "react";
import { MoreHorizontal, Clock, CheckSquare } from "react-feather";
import Chip from "../Chip/Chip";



import './Card.css';



function Card() {
  return <div className="card">
      <div className="card_top">
          <div className="card_top_labels">
            <Chip text="Fronted" color="green" />
            {/* <Chip close text="Fronted" color="green" /> */}
          </div>
        <MoreHorizontal />
      </div>
      <div className="card_title">
          testing 1
      </div>
      <div className="card_footer">
          <p><Clock />Nov 26</p>
          <p><CheckSquare /> 1/4 </p>
      </div>
  </div>;
}



export default Card;
