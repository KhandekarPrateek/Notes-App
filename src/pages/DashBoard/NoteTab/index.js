import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { Row } from "reactstrap";
import { MdOutlinePushPin } from "react-icons/md";

const NoteTab = ({
  noteArray,
  openNoteBody,
  updateNote,
  removeNote,
  isDark,
}) => {
  // ced9f2
  const [bg, setBg] = useState();
  const [isPinVisible, setIsPinVisible] = useState([false]);
  const [isHighlighted, setIsHighlighted] = useState([false]);
  const HandlePinVisible = (index) => {
    const enterVisible = [];
    enterVisible[index] = true;
    setIsPinVisible(enterVisible);
  };
  const HandlePinInVisible = (index) => {
    const enterInvisble = [];
    enterInvisble[index] = false;
    setIsPinVisible(enterInvisble);
  };
  // const [divIndex,setDivIndex]=useState()
  const noteHighlightDark = {
    background: "#ced9f2",
  };
  const HandleIsHighlighted = (index) => {
    console.log(index, "index");
    const foo = [];
    foo[index] = true;
    console.log(foo, "foo");
    setIsHighlighted(foo);
  };
  console.log(isHighlighted, "isHighlighted");
  const handleNoteClickProperties = (index) => {
    openNoteBody(index);
    HandleIsHighlighted(index);
  };
  return (
    <div className="profile-container">
      <Row className="h-100 border-end g-0 vstack gap-0 dashboard-border">
        {noteArray.map((e, index) => {
          const { noteHeader } = e;
          return (
            <>
              {noteHeader && (
                <div className="note-name-row border-bottom dashboard-border header-hover">
                  <div
                    className={`justify-content-between d-flex align-items-center h-100 ${
                      isHighlighted[index] ? "highlighted-note-name" : ""
                    }`}
                    onMouseEnter={() => HandlePinVisible(index)}
                    onMouseLeave={() => HandlePinInVisible(index)}
                    // onClick={() => {
                    //   HandleIsHighlighted(index);
                    // }}
                    // onClick={() => {
                    //   openNoteBody(index);
                    // }}
                    onClick={() => {
                      handleNoteClickProperties(index);
                    }}
                  >
                    <>
                      <div className="pin-icon icon-cursor">
                        {isPinVisible[index] && (
                          <MdOutlinePushPin
                            size={20}
                            className="justify-content-end d-flex"
                          />
                        )}
                      </div>
                      <h5
                        className="icon-cursor note-name text-truncate p-5  "
                        // onClick={() => {
                        //   openNoteBody(index);
                        // }}
                      >
                        {e.noteHeader}
                      </h5>
                    </>
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
