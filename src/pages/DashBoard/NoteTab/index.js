import React, { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { Row } from "reactstrap";
import { MdOutlinePushPin } from "react-icons/md";
import SearchBox from "../SearchBox";

const NoteTab = ({
  noteArray,
  openNoteBody,
  updateNote,
  removeNote,
  isDark,
  setNote,
}) => {
  const [isPinVisible, setIsPinVisible] = useState([false]);
  const [isHighlighted, setIsHighlighted] = useState([false]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNote, setFilterNote] = useState(noteArray);

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
  const HandleIsHighlighted = (index) => {
    const IsHighlighted = new Array(noteArray.length).fill(false);
    IsHighlighted[index] = true;
    setIsHighlighted(IsHighlighted);
    console.log(IsHighlighted, "ishiglighted in the func");
  };

  const handleNoteClickProperties = (index) => {
    openNoteBody(index);
    HandleIsHighlighted(index);
  };
  //this code is buggy comment it and solve later date
  // const HandlePinNote = (index) => {
  //   const tempNoteArray = [...noteArray];
  //   for (let i = index; i > 0; i--) {
  //     let temp = tempNoteArray[i];
  //     tempNoteArray[i] = tempNoteArray[i - 1];
  //     tempNoteArray[i - 1] = temp;
  //   }
  //   const newIsHighlighted = new Array(noteArray.length).fill(false);
  //   newIsHighlighted[0] = true;
  //   setIsHighlighted(newIsHighlighted);
  //   console.log(isHighlighted, "ishiglighted in the pin");

  //   setNote(tempNoteArray);
  // };
  //till here
  const searchBox = () => {
    if (searchTerm) {
      setFilterNote(
        noteArray.filter((item) =>
          item.noteHeader.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilterNote(noteArray);
    }
  };
  useEffect(() => {
    searchBox();
  }, [searchTerm, noteArray]);
  return (
    <div className="profile-container">
      <Row className="h-100 border-end g-0 vstack gap-0 dashboard-border">
        <SearchBox setSearchTerm={setSearchTerm} />
        {filterNote.map((e, index) => {
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
                    onClick={() => {
                      handleNoteClickProperties(index);
                    }}
                  >
                    <>
                      <div
                        className="pin-icon icon-cursor "
                        // onClick={() => {
                        //   HandlePinNote(index);
                        // }}
                      >
                        {isPinVisible[index] && (
                          <MdOutlinePushPin
                            size={20}
                            className="justify-content-end d-flex"
                          />
                        )}
                      </div>
                      <h5 className="icon-cursor note-name text-truncate px-5  ">
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
