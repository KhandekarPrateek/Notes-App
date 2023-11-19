import React from "react";
import { CgTrash } from "react-icons/cg";

const NotesName = (props) => {
  return (
    <div>
      {props.note && (
        <div className="justify-content-between d-flex">
          <h6 className="icon-cursor" onClick={props.openNoteBody}>
            {props.note}
          </h6>
          <CgTrash className="icon-cursor" onClick={props.removeNote} />
        </div>
      )}
    </div>
  );
};

export default NotesName;
