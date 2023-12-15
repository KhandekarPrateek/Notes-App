import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import { nanoid } from "nanoid";
import NavigationBar from "../../common/NavigationBar";
import { IoMdAdd } from "react-icons/io";
import NotesName from "./NotesName";
import { useNavigate, useParams } from "react-router";
import {
  auth,
  fetchFirebaseNote,
  handleUID,
} from "../../utils/firebase/firebase";
import { Editor } from "@tinymce/tinymce-react";

import { createFirbaseNote } from "../../utils/firebase/firebase";
import { ThemeContext } from "../../utils/ThemeContext";
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
  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);
  const [note, setNote] = useState([]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [onClickUUID, setOnClickUUID] = useState("");

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

  const openNoteBody = (num) => {
    const { noteContent, noteHeader, noteUUId } = note[num];
    setHeading(noteHeader);
    setContent(noteContent);
    setOnClickUUID(noteUUId);
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
    }
  };
  const navigate = useNavigate();
  const navigateToNoteName = (num) => {
    const storedData = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(storedData);
    if (note[num].noteHeader === null) {
      navigate(`/dashboard/${parsedData}`);
    } else {
      navigate(`/dashboard/${parsedData}/${note[num].noteUUId}`);
    }
  };

  const updateNote = (index) => {
    note[index].noteContent = content;
    note[index].noteHeader = heading;
    const abc = note;
    setNote(abc);
    createFirbaseNote(abc);
  };

  const handleEditorChange = (content) => {
    setContent(content);
  };
  const { noteUUID } = useParams();

  const BlogPost = () => {
    let flag = null;
    note.map((element) => {
      const { noteUUId, noteHeader, noteContent } = element;
      if (noteUUId === noteUUID) {
        setHeading(noteHeader);
        setContent(noteContent);
        return (flag = true);
      } else if (onClickUUID === noteUUId) {
        navigate(`/dashboard/${parsedData}/${onClickUUID}`);
        return (flag = true);
      }
      if (flag === false) {
        navigate(`/dashboard/${parsedData}`);
      }
    });
  };
  useEffect(() => {
    BlogPost();
  }, []);
  useEffect(() => {
    BlogPost();
  }, [note, noteUUID]);

  return (
    <div className="profile-container">
      <NavigationBar UUID={noteUUID} navNoteName={heading} />
      {note.length === 0 ? (
        <Row className="h-100">
          <div className="d-flex align-items-center justify-content-center">
            <h1>You have no notes</h1>

            <Button onClick={createNewNote}>Create a note</Button>
          </div>
        </Row>
      ) : (
        <>
          <Row className="h-100 ">
            <Col sm={3}>
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
              <Input
                name="noteHeader"
                placeholder="Notes heading"
                type="text"
                onChange={handleNoteNameChange}
                value={heading}
                bsSize="lg"
                className="note-name-heading mb-5 mt-1 "
                spellcheck="false"
              />
              <Editor
                apiKey="ombdk1krkq3vmtykx179vu7b26gg0slrgm6ckwvc70b6pb7y"
                init={{
                  height: "80vh",
                  placeholder: "Start typing ",
                  plugins: "quickbars ",
                  menubar: false,
                  statusbar: false,
                  toolbar: "quickbars",
                  quickbars_selection_toolbar:
                    " undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                value={content}
                onEditorChange={handleEditorChange}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Notes;
