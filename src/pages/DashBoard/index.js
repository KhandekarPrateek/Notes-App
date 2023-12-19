import React, { useContext, useEffect, useRef, useState } from "react";
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
import { toast } from "react-toastify";
import TinyMceEditor from "./Editor";
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
    toast.success("Note added", {
      position: toast.POSITION.TOP_RIGHT,
    });
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
    toast.success("Note deleted", {
      position: toast.POSITION.TOP_RIGHT,
    });
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
    toast.success("Note updated", {
      position: toast.POSITION.TOP_RIGHT,
    });
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
  const [{ isDark }] = useContext(ThemeContext);
  const foo = () => {
    console.log("foo");
    if (document.querySelector("iframe")) {
      const iframe1 = document.querySelector("iframe").contentDocument;
      const styleTag = iframe1.createElement("style");
      const cssRules = `
        .mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: ${isDark ? "white" : "black"};
        }
      `;
      styleTag.appendChild(iframe1.createTextNode(cssRules));
      iframe1.head.appendChild(styleTag);
    }
  };
  const tinyMceIframeFunc = () => {
    if (document.querySelector("iframe")) {
      console.log("func");
      const iframe = document.querySelector("iframe").contentWindow;
      if (isDark) {
        iframe.document.querySelector("body").style.color = "white";
      } else {
        iframe.document.querySelector("body").style.color = "black";
      }
    }
  };
  const iframeFunc = () => {
    foo();
    tinyMceIframeFunc();
  };

  useEffect(() => {
    iframeFunc();
  }, [isDark]);
  const [openNoteContainer, setopenNoteContainer] = useState(true);
  const togglePageSizeChange = (oldopenNoteContainer) => {
    setopenNoteContainer(!oldopenNoteContainer);
  };
  return (
    <div className="profile-container">
      {openNoteContainer ? (
        <>
          <Row className="d-flex justify-content-end">
            <Col sm={9}>
              <div>
                <NavigationBar
                  UUID={noteUUID}
                  navNoteName={heading}
                  openNoteContainer={openNoteContainer}
                  createNewNote={createNewNote}
                  togglePageSizeChange={togglePageSizeChange}
                />
              </div>
            </Col>

            <Row className="h-75">
              <Col sm={3}>
                <div className="justify-content-between d-flex">
                  <h3 className="justify-content-center d-flex">All notes</h3>
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
              <Col sm={9} className="justify-content-end ">
                <TinyMceEditor
                  handleNoteNameChange={handleNoteNameChange}
                  heading={heading}
                  iframeFunc={iframeFunc}
                  content={content}
                  handleEditorChange={handleEditorChange}
                />
              </Col>
            </Row>
          </Row>
        </>
      ) : (
        <>
          <div>
            <NavigationBar
              UUID={noteUUID}
              navNoteName={heading}
              openNoteContainer={openNoteContainer}
              createNewNote={createNewNote}
              togglePageSizeChange={togglePageSizeChange}
            />
          </div>
          <TinyMceEditor
            handleNoteNameChange={handleNoteNameChange}
            heading={heading}
            iframeFunc={iframeFunc}
            content={content}
            handleEditorChange={handleEditorChange}
          />
        </>
      )}
    </div>
  );
};

export default Notes;
