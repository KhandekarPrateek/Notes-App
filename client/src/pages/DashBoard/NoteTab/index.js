import React, { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { Row } from "reactstrap";
import { MdOutlinePushPin } from "react-icons/md";
import SearchBox from "../SearchBox";
import NavbarTooltip from "../../../common/NavbarToolTip";

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
    // console.log(IsHighlighted, "ishiglighted in the func");
  };

  const handleNoteClickProperties = (index) => {
    openNoteBody(index);
    HandleIsHighlighted(index);
  };

  const searchBox = () => {
    if (searchTerm) {
      setFilterNote(
        noteArray.filter((item) =>
          item.heading.toLowerCase().includes(searchTerm.toLowerCase())
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
        {filterNote.length === 0 ? (
          <div className="d-flex align-items-center justify-content-center text-secondary h-75">
            <h3>No Results</h3>
          </div>
        ) : (
          filterNote.map((e, index) => {
            const { heading } = e;
            return (
              <>
                {heading && (
                  <div className="note-name-row border-bottom dashboard-border header-hover">
                    <div
                      className={`justify-content-between d-flex align-items-center h-100 ${
                        isHighlighted[index] ? "highlighted-note-name" : ""
                      }`}
                      onMouseEnter={() => HandlePinVisible(index)}
                      onMouseLeave={() => HandlePinInVisible(index)}
                      onClick={() => {
                        handleNoteClickProperties(e.id);
                      }}
                    >
                      {/* handle note nlick is opening note but its also opening when note delelted */}
                      <>
                        <div className="pin-icon icon-cursor ">
                          {isPinVisible[index] && (
                            <MdOutlinePushPin
                              size={20}
                              className="justify-content-end d-flex"
                            />
                          )}
                        </div>
                        <h5 className="icon-cursor note-name text-truncate px-5  ">
                          {e.heading}
                        </h5>
                      </>
                      <div className="justify-content-end d-flex">
                        <GrUpdate
                          className="icon-cursor mx-2"
                          onClick={(event) => {
                            event.stopPropagation(); // Prevents opening the note body

                            updateNote(e.id);
                          }}
                        />
                        <div
                          id="delete"
                          className="icon-cursor"
                          onClick={(event) => {
                            event.stopPropagation(); // Prevents opening the note body
                            removeNote(e.id);
                          }}
                        >
                          <CgTrash />
                          <NavbarTooltip
                            placement="bottom"
                            target="delete"
                            content="Delete Note"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })
        )}
      </Row>
    </div>
  );
};

export default NoteTab;
