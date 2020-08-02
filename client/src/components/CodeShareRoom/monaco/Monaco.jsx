import React, { useState, useRef, useEffect } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { Editor } from "./Editor";
import { joinValue, socketEvents } from "../../../utils";

const editorConfig = {
  options: {
    minimap: {
      enabled: false,
    },
  },
  theme: "dark",
  language: "javascript",
  height: "95vh",
};

function Monaco({ socket, initialValue, room, username }) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);

  function handleEditorDidMount(_, editor) {
    setIsEditorReady(true);
    editorRef.current = editor;
    setEditor(new Editor(editorRef, socket, room, username));
  }

  const initialiseMonacoListeners = () => {
    editor.onValueChange();
  };

  const initialiseSocketListeners = () => {
    socket.on(socketEvents.INCOMING_CODE_CHANGE, ({ type, payload }) => {
      console.log({ type, payload });
    });
  };

  useEffect(() => {
    if (editorRef && isEditorReady) {
      initialiseMonacoListeners();
      initialiseSocketListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef, isEditorReady]);

  return (
    <ControlledEditor
      editorDidMount={handleEditorDidMount}
      value={initialValue ? joinValue(initialValue) : "//Setting it up for you"}
      {...editorConfig}
    />
  );
}

export default Monaco;
