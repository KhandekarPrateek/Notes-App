import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Input } from "reactstrap";

const TinyMceEditor = ({
  handleNoteNameChange,
  heading,
  iframeFunc,
  content,
  handleEditorChange,
}) => {
  return (
    <div>
      <Input
        name="noteHeader"
        placeholder="Notes heading"
        type="text"
        onChange={handleNoteNameChange}
        value={heading}
        className="note-name-heading mb-5 mt-1"
        spellcheck="false"
      />
      <Editor
        apiKey="ombdk1krkq3vmtykx179vu7b26gg0slrgm6ckwvc70b6pb7y"
        init={{
          onInit: iframeFunc(),
          selector: "textarea",
          height: "75vh",
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
    </div>
  );
};

export default TinyMceEditor;
