import React, { useState, useRef } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { initialValue } from "../../../utils";
import { Editor } from "./Editor";

const editorConfig = {
  options: {
    minimap: {
      enabled: false,
    },
  },
  theme: "dark",
  language: "javascript",
  height: "95vh",
  value: initialValue,
};

function Monaco() {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);
  function handleEditorDidMount(_, editor) {
    setIsEditorReady(true);
    editorRef.current = editor;
    setEditor(new Editor(editorRef));
  }

  return (
    <ControlledEditor editorDidMount={handleEditorDidMount} {...editorConfig} />
  );
}

export default Monaco;
