import React, { useEffect, useState } from "react";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { nanoid } from "nanoid";
import NavigationBar from "../../common/NavigationBar";
import { IoMdAdd } from "react-icons/io";
import NotesName from "./NotesName";
import { useNavigate } from "react-router";
import {
  auth,
  fetchFirebaseNote,
  handleUID,
} from "../../utils/firebase/firebase";

import { createFirbaseNote } from "../../utils/firebase/firebase";
const Notes = () => {
  useEffect(() => {
    handleUID();
  }, [auth]);

  const defaultNote = {
    noteUUId: nanoid(),
    noteId: 1,
    noteHeader: null,
    noteContent: "Create Your own notes",
    noteImage: null,
  };

  const [note, setNote] = useState([]);

  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const fetchingData = async () => {
    const fetchedData = await fetchFirebaseNote();
    console.log(fetchedData, "fetched data");
    if ("note" in fetchedData) {
      setNote(fetchedData.note);
      console.log("fetched state", note);
    } else {
      return;
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

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
    const result = [...note, newNote].filter((element) => {
      return element.noteHeader !== "";
    });
    console.log(result, "result");
    createFirbaseNote(result);
  };

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
    navigateToNoteName(num);
  };

  const removeNote = (num) => {
    setHeading("");
    setContent("");
    setNote(
      note.filter((ele, index) => {
        return index !== num;
      })
    );
    if (note.length - 1 > 0) {
      navigateToNoteName(0);
    } else {
      navigateToNoteName();
    }
  };
  const navigate = useNavigate();
  const navigateToNoteName = (num) => {
    const storedData = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(storedData);
    if (note[num].noteHeader === null) {
      navigate(`/dashboard/${parsedData.displayName}`);
    } else {
      navigate(`/dashboard/${parsedData.displayName}/${note[num].noteHeader}`);
    }
  };
  const updateNote = (num) => {
    setNote(
      note.map((element, index) => {
        if (index === num) {
          return { ...element, noteContent: content, noteHeader: heading };
        } else {
          return element;
        }
      })
    );
  };
  return (
    <Container fluid className="profile-conatiner">
      <NavigationBar name={heading} />
      {note.length === 0 ? (
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
                    <NotesName
                      note={e.noteHeader}
                      index={index}
                      openNoteBody={() => openNoteBody(index)}
                      removeNote={() => removeNote(index)}
                      updateNote={() => updateNote(index)}
                    />
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
