import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export const RTE = ({ value, onChange }) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="cd0dr72ymsi1dj5bkvg0rs9uo0j28t6ij122ouwac47beu2y"
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      init={{
        height: 500,
        menubar: true,
        directionality: "ltr", // Fix reverse typing
        forced_root_block: false, // Prevent wrapping in <p>
        plugins: "lists advlist link wordcount",
        toolbar:
          "undo redo",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; direction: ltr; }",
      }}
      onEditorChange={(newValue) => onChange(newValue)}
    />
  );
};


