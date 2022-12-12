import { useState, useRef } from "react";
import "./app.css";

function App() {
  const popped = useRef([]);
  const [points, setPoints] = useState([]);
  const [color, setColor] = useState("blue");
  const handlePlaceCircle = (e) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY, color }]);
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

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

  const handleClear = () => {
    setPoints([]);
    popped.current = [];
  };

  return (
    <>
      <button onClick={handleUndo} disabled={points.length >= 1 ? false : true}>
        Undo
      </button>
      <button
        onClick={handleRedo}
        disabled={popped.current.length == 0 ? true : false}
      >
        Redo
      </button>
      <button
        onClick={handleClear}
        disabled={points.length == 0 ? true : false}
      >
        Clear
      </button>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, i) => (
          <div
            className="point"
            key={i}
            style={{
              left: point.x - 5 + "px",
              top: point.y - 5 + "px",
              display: "inline-block",
              position: "absolute",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: point.color,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
