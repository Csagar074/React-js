import React from "react";

type BoxProps = {
  index: number;
  amount: number;
  activeBox: number | null;
  setActiveBox: React.Dispatch<React.SetStateAction<number | null>>;
};

function Box({ index, amount, activeBox, setActiveBox }: BoxProps) {
  return (
    <div
      className={`box ${activeBox === index ? "active" : ""}`}
      onClick={() => setActiveBox(index)}
    >
      <h3>Plan {index + 1}</h3>
      <p>₹{amount}</p>
    </div>
  );
}

export default Box;