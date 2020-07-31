import React, { useState, useEffect, useRef, useContext } from "react";
import { socketEvents } from "../../../utils";
import { WhiteBoardContext } from "../Room";

function WhiteBoard({ socket, username, room, incomingStroke, parentNode }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [current, setCurrent] = useState({ x: 0, y: 0 });

  const whiteBoardContext = useContext(WhiteBoardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = parentNode && parentNode.getBoundingClientRect().width;
    canvas.height = parentNode && parentNode.getBoundingClientRect().height;
    // canvas.style.width = `${canvas.width}px`;
    // canvas.style.height = `${canvas.height}px`;
    const context = canvas.getContext("2d");
    // context.scale(2, 2);
    context.lineCap = whiteBoardContext.lineCap;
    context.lineWidth = whiteBoardContext.lineWidth;
    contextRef.current = context;
  }, [parentNode]);

  useEffect(() => {
    if (incomingStroke) {
      incomingDrawing(incomingStroke);
    }
  }, [incomingStroke]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setCurrent({ x: offsetX, y: offsetY });
    setIsDrawing(true);
  };

  const finishDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!isDrawing) {
      return;
    }
    setIsDrawing(false);
    drawLine(
      current.x,
      current.y,
      offsetX,
      offsetY,
      whiteBoardContext.color,
      false
    );
  };

  const incomingDrawing = (incomingStroke) => {
    const { x0, y0, x1, y1 } = incomingStroke.stroke;
    const { color } = incomingStroke.config;

    drawLine(
      x0 * canvasRef.current.width,
      y0 * canvasRef.current.height,
      x1 * canvasRef.current.width,
      y1 * canvasRef.current.height,
      color,
      false
    );
  };

  const mouseMoving = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    drawLine(
      current.x,
      current.y,
      offsetX,
      offsetY,
      whiteBoardContext.color,
      true
    );
    setCurrent({ x: offsetX, y: offsetY });
  };

  function drawLine(x0, y0, x1, y1, color, emit) {
    contextRef.current.beginPath();
    contextRef.current.moveTo(x0, y0);
    contextRef.current.lineTo(x1, y1);
    contextRef.current.strokeStyle = color;
    contextRef.current.stroke();
    contextRef.current.closePath();

    if (!emit) return;

    socket.emit(socketEvents.DRAWING, {
      name: username,
      room: room,
      config: {
        color: whiteBoardContext.color,
      },
      stroke: {
        x0: x0 / canvasRef.current.width,
        y0: y0 / canvasRef.current.height,
        x1: x1 / canvasRef.current.width,
        y1: y1 / canvasRef.current.height,
      },
    });
  }

  return (
    <canvas
      className="whiteboard"
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseOut={finishDrawing}
      onMouseMove={mouseMoving}
    />
  );
}

export default WhiteBoard;
