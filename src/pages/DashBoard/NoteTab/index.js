import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { Row } from "reactstrap";

const NoteTab = ({ noteArray, openNoteBody, updateNote, removeNote }) => {
  return (
    <div className="profile-container">
      <Row className="h-100 border-end g-0 vstack gap-0 dashboard-border">
        {noteArray.map((e, index) => {
          const { noteHeader } = e;

          return (
            <>
              {noteHeader && (
                <div
                  key={index}
                  className="note-name-row border-bottom dashboard-border header-hover"
                >
                  <div className="justify-content-between d-flex ">
                    {/* <div className="align-items-center d-flex"> */}
                    <h5
                      className="icon-cursor note-name "
                      onClick={() => {
                        openNoteBody(index);
                      }}
                    >
                      {e.noteHeader}
                    </h5>
                    {/* </div> */}
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
