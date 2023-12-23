import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { Row } from "reactstrap";

const NoteTab = ({
  noteArray,
  openNoteBody,
  updateNote,
  removeNote,
  isDark,
}) => {
  // ced9f2
  const [bg, setBg] = useState([]);
  // const [divIndex,setDivIndex]=useState()
  const noteHighlightDark = {
    background: "#ced9f2",
  };

  return (
    <div className="profile-container">
      <Row className="h-100 border-end g-0 vstack gap-0 dashboard-border">
        {noteArray.map((e, index) => {
          const { noteHeader } = e;
          return (
            <>
              {noteHeader && (
                <div
                  className="note-name-row border-bottom dashboard-border header-hover"
                  // onClick={() => {
                  //   noteNameHighlight(index);
                  // }}
                >
                  <div className="justify-content-between d-flex align-items-center h-100 ">
                    <h5
                      className="icon-cursor note-name text-truncate p-5 "
                      onClick={() => {
                        openNoteBody(index);
                      }}
                    >
                      {e.noteHeader}
                    </h5>
                    <div className="justify-content-end d-flex">
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
                </div>
              )}
            </>
          );
        })}
      </Row>
    </div>
  );
};

export default NoteTab;
