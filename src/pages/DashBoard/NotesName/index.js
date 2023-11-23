import React from "react";
import { CgTrash } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";

const NotesName = (props) => {
  return (
    <div>
      {props.note && (
        <div className="justify-content-between d-flex">
          <h6 className="icon-cursor" onClick={props.openNoteBody}>
            {props.note}
          </h6>
          <div className="justify-content-end">
            <GrUpdate className="icon-cursor mx-2" onClick={props.updateNote} />
            <CgTrash className="icon-cursor" onClick={props.removeNote} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesName;
