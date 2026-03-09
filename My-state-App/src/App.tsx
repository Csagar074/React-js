import { useState } from "react";


function App() {

  let name: String = "sagar";
  let age: number = 10;
  let istheme: boolean = false;
  let phone: Number | string = 0;

  const [counter, setcounter] = useState<number>(0)

  function increment() {
    setcounter(counter + 1)
  }


  name = +"chavda";
  phone = 9624459963
  return <>
    <h1>Hello World</h1>
    <h2>counter.{counter}</h2>
    <button onClick={() => { increment() }}>counter</button>

    <p>Name:{name}</p>
    <p>age:{age.toString()}</p>
    <p>Phone:{phone.toString()}</p>
    <p>Theme:{istheme.toString()}</p>

  </>

}

export default App;
