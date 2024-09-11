import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import NavigationBar from "../../common/NavigationBar";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../utils/ThemeContext";
import { toast } from "react-toastify";
import NoteTab from "./NoteTab";
import Loader from "../../common/Loader";
import TextAreaEditor from "./TextEditor/index";

const Notes = () => {
  const [note, setNote] = useState([]);
  const [heading, setHeading] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNoteNameChange = (event) => {
    setHeading(event.target.value);
  };

  const handleEditorChange = (event) => {
    setNewContent(event.target.value);
  };

  const [{ isDark }] = useContext(ThemeContext);

  const [openNoteContainer, setOpenNoteContainer] = useState(true);
  const togglePageSizeChange = (oldOpenNoteContainer) => {
    setOpenNoteContainer(!oldOpenNoteContainer);
  };

  // Fetch all notes
  const getAllNotes = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://notes-app-gilt-chi.vercel.app/notes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to fetch notes");
      }

      const fetchedNotes = data.notes.map((note) => ({
        heading: note.title,
        content: note.content,
        id: note._id,
      }));

      setNote(fetchedNotes);
      toast.success("Notes fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNotes(); // Fetch notes when the component loads
  }, []);

  // Create new note
  const createNewNote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch("https://notes-app-gilt-chi.vercel.app/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: heading,
          content: newContent,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }

      const { title, content, _id } = data.note;
      const resNote = { heading: title, content: content, id: _id };
      setNote([...note, resNote]);
      setHeading("");
      setNewContent("");
      toast.success("Note saved successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const openNoteBody = (id) => {
    const selectedNote = note.find((n) => n.id === id);
    if (selectedNote) {
      setHeading(selectedNote.heading);
      setNewContent(selectedNote.content);
    } else {
      toast.error("Note not found");
    }
  };
  const updateNote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
  
    try {
      const response = await fetch(`https://notes-app-gilt-chi.vercel.app/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: heading,  // Use the current heading
          content: newContent, // Use the current content
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
  
      const updatedNote = { heading: data.note.title, content: data.note.content, id: data.note._id };
      setNote(note.map(n => (n.id === id ? updatedNote : n))); // Update the note in the array
      toast.success("Note updated successfully");
      setHeading("");
      setNewContent("");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const removeNote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
  
    try {
      const response = await fetch(`https://notes-app-gilt-chi.vercel.app/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data, "data");
      } else {
        console.warn("Received non-JSON response");
      }
  
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
  
      setNote(note.filter(n => n.id !== id)); // Remove the note from the array
      toast.success("Note removed successfully");
      setHeading("");
      setNewContent("");
    } catch (error) {
      console.error(error, "Error during deletion");
      toast.error( "Failed to remove note");
    }
  };
  
  
  return (
    <div className="profile-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {openNoteContainer ? (
            <>
              <Row className="d-flex justify-content-end g-0">
                <Col sm={3} className="justify-content-center d-flex align-items-center border-bottom border-end g-0 dashboard-border">
                  <div className="navbar-rules">
                    <h3>All notes</h3>
                  </div>
                </Col>
                <Col sm={9}>
                  <NavigationBar
                    navNoteName={heading}
                    openNoteContainer={openNoteContainer}
                    createNewNote={createNewNote}
                    togglePageSizeChange={togglePageSizeChange}
                  />
                </Col>
                <Row className="g-0">
                  <Col sm={3}>
                    <NoteTab
                    updateNote={updateNote}
                      noteArray={note}
                      removeNote={removeNote}
                      openNoteBody={openNoteBody}
                      isDark={isDark}
                      setNote={setNote}
                    />
                  </Col>
                  <Col sm={9} className="justify-content-end">
                    <TextAreaEditor
                      handleNoteNameChange={handleNoteNameChange}
                      heading={heading}
                      newContent={newContent}
                      handleEditorChange={handleEditorChange}
                    />
                  </Col>
                </Row>
              </Row>
            </>
          ) : (
            <>
              <NavigationBar
                navNoteName={heading}
                openNoteContainer={openNoteContainer}
                createNewNote={createNewNote}
                togglePageSizeChange={togglePageSizeChange}
              />
              <TextAreaEditor
                handleNoteNameChange={handleNoteNameChange}
                heading={heading}
                newContent={newContent}
                handleEditorChange={handleEditorChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Notes;
