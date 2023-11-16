import React, { useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { nanoid } from "nanoid";
import NavigationBar from "../../common/NavigationBar";

const Notes = () => {
  const defaultNote = {
    noteUUId: nanoid(),
    noteId: 1,
    noteHeader: "Get started",
    noteContent: "Create Your own notes",
    noteImage: null,
  };
  const [note, setNote] = useState([defaultNote]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const createNewNote = () => {
    const newNote = {
      ...defaultNote,
      noteId: note.length + 1,
      noteUUId: nanoid(),
      noteHeader: heading,
      noteContent: content,
    };

    setNote([...note, newNote]);
  };
  console.log(note, "notes");
  const handleNoteNameChange = (event) => {
    setHeading(event.target.value);
  };
  const handleNoteContentChange = (event) => {
    setContent(event.target.value);
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
              <h2 className="text-center">Notes name</h2>
              <Button onClick={createNewNote}>Add note</Button>
              <div>
                {note.map((e) => {
                  return <h6>{e.noteHeader}</h6>;
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
              />
              Write Your notes
              <Input
                name="noteContent"
                placeholder="Notes Content"
                type="text"
                onChange={handleNoteContentChange}
                row={40}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Notes;
