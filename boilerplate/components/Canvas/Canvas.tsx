import React, { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
