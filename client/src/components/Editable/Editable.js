import React, { useState} from "react";
import { X } from "react-feather";

function Editable(props) {
    const [showEdit,setShowEdit]=useState(false)
  return (
    <div className="editable">
        {
            showEdit ? (
        <form className="editable_edit" 
      onSubmit={(event)=>{
         event.preventDefault()
         if(props.onSubmit)props.onSubmit()
      }}
      >
        <input
          type="text"
          defaultValue={props.text}
          placeholder={props.placeholder}
        />
        <div className="editable_edit_footer">
          <button type="submit">{props.buttonText || "Add"}</button>
          <X onClick={() => setShowEdit(false)} />
        </div>
      </form>)
     : <p onClick={() => setShowEdit(true)}>{props.text || "Add item"}</p>}
    </div>
  );
}

export default Editable;
