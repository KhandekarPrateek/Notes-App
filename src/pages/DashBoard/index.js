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
import EditorTinyMce from "../../utils/EditorTinyMce/index";

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
    if ("note" in fetchedData) {
      setNote(fetchedData.note);
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
    createFirbaseNote(note);
    const abc = note.filter((ele, index) => {
      return index !== num;
    });
    setNote(abc);
    createFirbaseNote(abc);
    if (note.length > 0) {
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
      navigate(`/dashboard/${parsedData}`);
    } else {
      navigate(`/dashboard/${parsedData}/${note[num].noteHeader}`);
    }
  };

  const updateNote = (index) => {
    note[index].noteContent = content;
    note[index].noteHeader = heading;
    const abc = note;
    setNote(abc);
    createFirbaseNote(abc);
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
                      openNoteBody={openNoteBody}
                      removeNote={removeNote}
                      updateNote={updateNote}
                    />
                  );
                })}
              </div>
            </Col>

            <Col sm={9}>
              create your notes
              {/* <EditorTinyMce /> */}
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
