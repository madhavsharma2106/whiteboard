const RoomTypes = {
  whiteBoardRoom: "whiteBoardRoom",
  codeShareRoom: "codeShareRoom",
};

const initialValue = `import React from 'react';
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

const splitCodeIntoArrayByNextLines = (code) => code.split("\n");

const splitValue = initialValue.split("\n");

const buildRoomName = (room, roomType = RoomTypes.codeShareRoom) =>
  `${room}-${roomType}`;

module.exports = {
  RoomTypes,
  initialValue,
  splitValue,
  buildRoomName,
  splitCodeIntoArrayByNextLines,
};
