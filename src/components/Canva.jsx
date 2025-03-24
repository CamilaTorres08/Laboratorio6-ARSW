import React, { useRef, useEffect, useState } from "react";

const Canva = ({ blueprint, updatePoints }) => {
  const [points, setPoints] = useState([]);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const updateCanvasSize = () => {
    if (containerRef.current) {
      const newWidth = containerRef.current.clientWidth;
      setCanvasSize({ width: newWidth, height: 500 }); 
    }
  };
  useEffect(() => {
    updateCanvasSize(); 
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);
  const handlePointer = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;
    setPoints((prevPoints) => [...prevPoints, {x,y}]);
  };  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y); 

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y); 
      }

      ctx.stroke();
    }
  }, [points, blueprint, canvasSize]); 

  useEffect(() => {
    setPoints([...blueprint.points]);
  }, [blueprint]);
  useEffect(() => {
    updatePoints(points);
  }, [points]);

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", border: "1px solid black" }}
        onClick={handlePointer}
        onTouchStart={handlePointer}
      />
    </div>
  );
};

export default Canva;
