export const API_ENDPOINT = "localhost:9009/";

export const socketEvents = {
  JOIN: "join",
  DISCONNECT: "disconnect",
  ROOMDATA: "roomData",
  MESSAGE: "message",
  DRAWING: "drawing",
  CUSTOMDISCONNECT: "customDisconnect",
};

export const RoomTypes = {
  whiteBoardRoom: "whiteBoardRoom",
  codeShareRoom: "codeShareRoom",
};

export const initialValue = `import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
`;
