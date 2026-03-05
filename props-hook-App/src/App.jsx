import { useState } from "react";
import Location from "./Location";

export default function App() {


  const [counter, setCounter] = useState(1);

  const increment = () => {
    if (counter < 17) {
      setCounter(counter + 1);
    } else {
      alert("Out of stock..");
    }
  }


  let myBtnStyle = {
    backgroundColor: 'orange',
    border: 'none',
    margin: '5px',
    borderRadius: '50px',
    color: 'white'
  };

  return <>
    <center>
      <h2>Counter App</h2>

      <div>
        <button style={myBtnStyle} onClick={() => { if (counter > 1) { setCounter(counter - 1) } }}>➖</button>
        {counter}
        <button style={myBtnStyle} onClick={increment}>➕</button>
      </div>

      <Location city="Surat" state="GUJARAT" country="India" num={counter} />
    </center >
  </>
}