import React, { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
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

  const createNewNote = () => {
    const newNote = {
      ...defaultNote,
      noteId: note.length + 1,
      noteUUId: nanoid(),
    };
    const noteArray = [defaultNote];
    noteArray.push(newNote);
    setNote(noteArray);
  };
  console.log(note, "notes");

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
          <div
            className="offcanvas offcanvas-start"
            tabindex="-1"
            id="offcanvas"
            aria-labelledby="offcanvasLabel"
          >
            <div className="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#my-offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              Content for the offcanvas goes here. You can place just about any
              Bootstrap component or custom elements here.
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Notes;
