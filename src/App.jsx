import { useState, useRef } from "react";
import "./app.css";

function App() {
  const popped = useRef([]);
  const [points, setPoints] = useState([]);
  const [color, setColor] = useState("blue");
  const [circleWidth, setCircleWidth] = useState(30);
  const [circleHeight, setCircleHeight] = useState(30);

  // Place circles with random color
  const handlePlaceCircle = (e) => {
    const { clientX, clientY } = e;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
    setPoints([
      ...points,
      { x: clientX, y: clientY, color, circleHeight, circleWidth },
    ]);
  };
  // Undo and Redo circles
  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    setPoints(newPoints);
    popped.current.push(poppedPoint);
  };
  const handleRedo = () => {
    const newPopped = [...popped.current];
    const poppedPoint = newPopped.pop();
    setPoints([...points, poppedPoint]);
    popped.current = newPopped;
  };

  // Clear Page
  const handleClear = () => {
    setPoints([]);
    popped.current = [];
  };

  const handleWheel = (e) => {
    const newPoints = [...points];
    if (e.deltaY > 0) {
      if (circleHeight >= 360 || circleWidth >= 360) return;
      setCircleHeight(circleHeight + 15);
      setCircleWidth(circleWidth + 15);
    } else {
      if (circleHeight <= 15 || circleWidth <= 15) return;
      setCircleHeight(circleHeight - 15);
      setCircleWidth(circleWidth - 15);
    }
    setPoints(newPoints);
  };

  return (
    <div onWheel={handleWheel}>
      <button
        onClick={handleUndo}
        disabled={points.length >= 1 ? false : true}
        className="buttons"
      >
        Undo
      </button>
      <button
        onClick={handleRedo}
        disabled={popped.current.length == 0 ? true : false}
        className="buttons"
      >
        Redo
      </button>
      <button
        onClick={handleClear}
        disabled={points.length == 0 ? true : false}
        className="buttons"
      >
        Clear
      </button>
      <span>Diameter of Circle {circleHeight}</span>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, i) => (
          <div
            className="point"
            key={i}
            style={{
              left: point.x - point.circleWidth / 2 + "px",
              top: point.y - point.circleHeight / 2 + "px",
              display: "inline-block",
              position: "absolute",
              width: point.circleWidth,
              height: point.circleHeight,
              borderRadius: "50%",
              backgroundColor: point.color,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
