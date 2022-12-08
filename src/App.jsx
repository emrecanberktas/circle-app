import { useState, useRef } from "react";
import "./app.css";

function App() {
  const popped = useRef([]);
  const [points, setPoints] = useState([]);
  const handlePlaceCircle = (e) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
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
  const current = popped.current;
  console.log({ points });
  console.log({ current });
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
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, i) => (
          <div
            className="point"
            key={i}
            style={{ left: point.x - 5 + "px", top: point.y - 5 + "px" }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
