import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Input, Row } from "reactstrap";
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

  const [note, setNote] = useState([]);

  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [{ theme }] = useContext(ThemeContext);
  const styles = {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
  };
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

  const handleEditorChange = (content) => {
    setContent(content);
    console.log(content, "the state content");
  };

  return (
    <div className="profile-container" style={styles}>
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
              <Input
                style={styles}
                name="noteHeader"
                placeholder="Notes heading"
                type="text"
                onChange={handleNoteNameChange}
                value={heading}
              />
              Write Your notes
              <Editor
                initialValue=""
                apiKey="ombdk1krkq3vmtykx179vu7b26gg0slrgm6ckwvc70b6pb7y"
                init={{
                  skin: "oxide-dark",

                  content_css: "dark",

                  plugins:
                    "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
