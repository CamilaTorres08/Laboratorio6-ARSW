import React, { useRef, useEffect } from "react";

const Canva = ({ blueprint }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (blueprint.points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y); 

      for (let i = 1; i < blueprint.points.length; i++) {
        ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y); 
      }

      ctx.stroke();
    }
  }, [blueprint.points]); 

  return (
    <>
      <h3>Current blueprint: {blueprint.name}</h3>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </>
  );
};

export default Canva;
