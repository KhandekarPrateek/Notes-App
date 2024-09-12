import React from "react";
import { Form, Input, Label } from "reactstrap";

const TextAreaEditor = ({ handleNoteNameChange, heading, newContent, handleEditorChange }) => {
  return (
    <Form>
      {/* <Label for="noteHeading">Note Heading</Label> */}
      <Input
        type="text"
        name="heading"
        id="noteHeading"
        placeholder="Enter note title"
        className="note-name-heading mb-5 mt-1"

        value={heading}
        onChange={handleNoteNameChange}
      />
      {/* <Label for="noteContent">Note Content</Label> */}
      <Input
        type="textarea"
        name="content"
        id="noteContent"
        placeholder="Enter note content"
        value={newContent}
        onChange={handleEditorChange}
        rows="15"
        style={{ fontSize: "25px" }} 
      />
    </Form>
  );
};

export default TextAreaEditor;
