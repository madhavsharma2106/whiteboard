import React, { useState, useRef, useEffect } from "react";
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

  const initialiseListeners = () => {};

  useEffect(() => {
    if (editorRef && isEditorReady) {
      initialiseListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef, isEditorReady]);

  return (
    <ControlledEditor editorDidMount={handleEditorDidMount} {...editorConfig} />
  );
}

export default Monaco;
