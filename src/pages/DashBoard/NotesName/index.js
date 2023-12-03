import React from "react";
import { CgTrash } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";

const NotesName = (props) => {
  const { index, note, openNoteBody, updateNote, removeNote } = props;
  return (
    <div>
      {note && (
        <div className="justify-content-between d-flex">
          <h6
            className="icon-cursor"
            onClick={() => {
              openNoteBody(index);
            }}
          >
            {note}
          </h6>
          <div className="justify-content-end">
            <GrUpdate
              className="icon-cursor mx-2"
              onClick={() => {
                updateNote(index);
              }}
            />
            <CgTrash
              className="icon-cursor"
              onClick={() => {
                removeNote(index);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesName;
