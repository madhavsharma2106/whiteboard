import { Socket } from "socket.io-client";
import {
  socketEvents,
  checkIfCodeChangeIsAffectingMulitpleLines,
} from "../../../utils";

export class Editor {
  decorations = [];
  constructor(editor, socket, room, username) {
    this.editor = editor.current;
    this.socket = socket;
    this.room = room;
    this.username = username;
    this.isFirstRender = true;
  }

  _defaultLogger(value) {
    console.log(value);
  }

  /**
   * Emits the data to the event
   *
   * @param {string} eventName
   * @param {object} data
   */

  emitEvent(eventName, data) {
    console.log(eventName, data);
    this.socket.emit(eventName, data);
  }

  /**
   * Listens to events of cursor selection.
   */
  onChangeCursorSelection(cb = this._defaultLogger) {
    this.editor.onDidChangeCursorSelection(cb);
  }

  /**
   * Listens to change in cursor position
   */
  onChangeCursorPosition() {
    this.editor.onDidChangeCursorPosition((event) => {
      const type = "cursorPositionChange";
      const payload = event.position;
      this.emitEvent(socketEvents.REGISTER_CURSOR_POSITION_CHANGE, {
        type,
        payload,
        name: this.username,
        room: this.room,
      });
    });
  }

  /**
   * Listens to value change in the editor
   */
  onValueChange() {
    console.log(this.isFirstRender);
    if (this.isFirstRender) this.isFirstRender = false;
    this.editor.onDidChangeModelContent((event) => {
      console.log(event);
      const { changes } = event;
      let fullCode;
      // No emitting the changes if the event is not triggered by the user
      if (changes[0].forceMoveMarkers) return;
      if (fullCode === changes[0].text) return;

      if (checkIfCodeChangeIsAffectingMulitpleLines(changes[0])) {
        fullCode = this.getValue();
      }

      const payload = {
        lineNumber: changes[0].range.startLineNumber - 1,
        column: changes[0].range.startColumn - 1,
        text: changes[0].text,
        room: this.room,
        range: changes[0].range,
        fullCode,
      };

      const type = "addition";

      this.emitEvent(socketEvents.REGISTER_CODE_CHANGE, { type, payload });
    });
  }

  /**
   * Get value
   *
   * @return {string} current value of the editor
   */
  getValue() {
    return this.editor.getValue();
  }

  /**
   * Takes value and replaces the editor with it.
   * @param {string} value
   */

  setValue(value) {
    console.log(this.editor.setValue(value));
  }

  /**
   *  Sets the cursor position to the specified position
   * @param {{column: number, lineNumber: number}} position
   */
  setPosition(position) {
    this.editor.setPosition(position);
  }

  getOptions() {
    console.log(this.editor.getOptions());
  }

  setMultipleSelections(selections) {
    this.editor.setSelections(selections);
  }

  setSelectionsWithHighlight(selections) {
    this.editor.deltaDecorations(
      [],
      [
        {
          range: {
            endColumn: 4,
            startColumn: 0,
            endLineNumber: 4,
            startLineNumber: 0,
          },
          options: {
            className: "blue-background",
            hoverMessage: { value: "This message is on hover" },
          },
        },
      ]
    );
  }

  /**
   * Adding new cursors
   */
  addNewCursor(data) {
    const { name, payload } = data;
    const { column, lineNumber } = payload;

    const position = [
      {
        range: {
          endColumn: column,
          startColumn: column,
          endLineNumber: lineNumber,
          startLineNumber: lineNumber,
        },
        options: {
          className: "blue-cursor",
        },
      },
    ];
    this.decorations = this.editor.deltaDecorations(this.decorations, position);
  }

  /**
   * Inserts text at the cursor position
   */
  insertAtCursorPosition(text) {
    this.editor.trigger("keyboard", "type", {
      text,
    });
  }

  insertTextAtPosition(payload) {
    const { text, range } = payload;

    const identifier = { major: 1, minor: 1 };
    const forceMoveMarkers = "true";

    this.editor.executeEdits("my-source", [
      {
        identifier,
        range,
        text,
        forceMoveMarkers,
      },
    ]);
  }

  _handleCodeAddition(payload) {
    this.insertTextAtPosition(payload);
  }

  handleIncomingCodeChangeEvent(event) {
    const { type, payload } = event;
    switch (type) {
      case "addition":
        this._handleCodeAddition(payload);
        break;
    }
  }
}
