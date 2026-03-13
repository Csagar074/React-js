import { useState } from "react";
import Box from "./components/Box";
import PaymentInfo from "./components/PaymentInfo";
import "./App.css";

function App() {
  const [activeBox, setActiveBox] = useState<number | null>(null);

  const payments: number[] = [100, 200, 300, 400, 500];

  return (
    <div className="container">
      <h1>Choose Payment Plan</h1>

      <div className="boxContainer">
        {payments.map((amount, index) => (
          <Box
            key={index}
            index={index}
            amount={amount}
            activeBox={activeBox}
            setActiveBox={setActiveBox}
          />
        ))}
      </div>

      <PaymentInfo activeBox={activeBox} payments={payments} />
    </div>
  );
}

export default App;