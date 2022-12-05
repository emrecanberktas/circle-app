import { useState } from "react";
import "./app.css";

function App() {
  const [points, setPoints] = useState([]);
  const [popped, setPopped] = useState([]);
  const handlePlaceCircle = (e) => {
    console.log(e);
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
  };
  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    setPoints(newPoints);
    setPopped([...popped, poppedPoint]);
  };
  const handleRedo = () => {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    setPopped(newPopped);
    setPoints([...points, poppedPoint]);
  };
  return (
    <>
      <button onClick={handleUndo} disabled={points.length >= 1 ? false : true}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={popped.length == 0 ? true : false}>
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
