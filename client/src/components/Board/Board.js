import React from 'react';
import {Edit, MoreHorizontal} from 'react-feather';
import  Card from "../Card/Card";
import Editable from '../Editable/Editable';

import "./Board.css";

export default function Board() {
    return (
        <div className="board">
            <div className="board_top">
            <p className="board_top_title">To Do <span> 2</span>
            </p>
           <MoreHorizontal />
            </div>
            <div className="board_cards custom-scroll">
                <Card />
                <Card />
                <Editable />
            </div>
        </div>
    )
}
