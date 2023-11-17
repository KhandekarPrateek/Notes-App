import React, { useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { nanoid } from "nanoid";
import NavigationBar from "../../common/NavigationBar";
import { IoMdAdd } from "react-icons/io";
import { CgTrash } from "react-icons/cg";
const Notes = () => {
  const defaultNote = {
    noteUUId: nanoid(),
    noteId: 1,
    noteHeader: null,
    noteContent: "Create Your own notes",
    noteImage: null,
  };
  const [note, setNote] = useState([defaultNote]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const defaultNoteBody = {
    head: null,
    body: null,
  };

  const createNewNote = () => {
    const newNote = {
      ...defaultNote,
      noteId: note.length + 1,
      noteUUId: nanoid(),
      noteHeader: heading,
      noteContent: content,
    };
    setNote([...note, newNote]);
    setHeading("");
    setContent("");
  };
  console.log(note, "notes");
  const handleNoteNameChange = (event) => {
    setHeading(event.target.value);
  };
  const handleNoteContentChange = (event) => {
    setContent(event.target.value);
  };

  const openNoteBody = (num) => {
    const noteContentOnClick = note[num].noteContent;
    const noteHeaderOnClick = note[num].noteHeader;

    setHeading(noteHeaderOnClick);
    setContent(noteContentOnClick);
  };

  const removeNote = (num) => {
    setHeading("");
    setContent("");
    setNote(
      note.filter((ele, index) => {
        return index !== num;
      })
    );
  };

  return (
    <Container fluid className="profile-conatiner">
      <NavigationBar />
      {note.length === 1 ? (
        <Row className="h-100">
          <div className="d-flex align-items-center justify-content-center">
            <h1>You have no notes</h1>

            <Button onClick={createNewNote}>Create a note</Button>
          </div>
        </Row>
      ) : (
        <>
          <Row className="h-100">
            <Col sm={3} className="border border-5  ">
              <div className="justify-content-between d-flex">
                <h2>Notes name</h2>

                <IoMdAdd
                  onClick={createNewNote}
                  size={35}
                  className="icon-cursor"
                />
              </div>
              <div>
                {note.map((e, index) => {
                  return (
                    e.noteHeader && (
                      <div className="justify-content-between d-flex">
                        <h6
                          className="icon-cursor"
                          onClick={() => openNoteBody(index)}
                        >
                          {e.noteHeader}
                        </h6>
                        <CgTrash
                          className="icon-cursor"
                          onClick={() => removeNote(index)}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </Col>

            <Col sm={6}>
              create your notes
              <Input
                name="noteHeader"
                placeholder="Notes heading"
                type="text"
                onChange={handleNoteNameChange}
                value={heading}
              />
              Write Your notes
              <Input
                name="noteContent"
                placeholder="Notes Content"
                type="text"
                onChange={handleNoteContentChange}
                row={40}
                value={content}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Notes;
