import { useState } from "react";

export default function App() {
  const [number, setNumber] = useState(0);

  function increment() {
    setNumber(number + 1);
  }

  function decrement() {
    if (number > 0) {
      setNumber(number - 1);
    }
  }

  function reset() {
    setNumber(0);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Counter App</h1>

        <h2
          style={{
            fontSize: "50px",
            margin: "20px 0",
            color: "#333",
          }}
        >
          {number}
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={decrement}
            style={{
              padding: "10px 18px",
              marginRight: "10px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#ff4b5c",
              color: "white",
            }}
          >
            -
          </button>

          <button
            onClick={increment}
            style={{
              padding: "10px 18px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              color: "white",
            }}
          >
            +
          </button>
        </div>

        <button
          onClick={reset}
          style={{
            padding: "8px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#333",
            color: "white",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}