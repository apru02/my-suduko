import "./App.css";
import Suduko from "./components/Suduko";
import { useState } from "react";
//import { generateUniqueRandomNumbers } from "./components/random_numbers";
function App() {
  const reloadgame = () => {
    window.location.reload();
  };
  //const [x, setx] = useState(35);
  const generateUniqueRandomNumbers = (x) => {
    const numbers = new Set();
    while (numbers.size < x) {
      const randomNum = Math.floor(Math.random() * 81); // Generate a random number between 0 and 80 (inclusive)
      numbers.add(randomNum);
    }
    return Array.from(numbers);
  };
  const [uniqueRandomNumbers, setuniqueRandomNumbers] = useState(
    generateUniqueRandomNumbers(30)
  );
  const changedifficulty = (y) => {
    console.log(y);
    //setx(y);
    setuniqueRandomNumbers(generateUniqueRandomNumbers(y));
    //uniqueRandomNumbers = generateUniqueRandomNumbers(y);
  };
  return (
    <div>
      <h1 className="myheader">MY &nbsp; SUDUKO &nbsp; GAME</h1>
      <nav className="my_nav">
        <ul className="difficulty">
          <li style={{ padding: "5px" }}>Difficulty :</li>

          <li
            className="modes"
            onClick={() => changedifficulty(35)}
            style={
              uniqueRandomNumbers.length === 35
                ? { textDecoration: "underline" }
                : { textDecoration: "none" }
            }
          >
            Easy
          </li>
          <li
            className="modes"
            onClick={() => changedifficulty(30)}
            style={
              uniqueRandomNumbers.length === 30
                ? { textDecoration: "underline" }
                : { textDecoration: "none" }
            }
          >
            Medium
          </li>
          <li
            className="modes"
            onClick={() => changedifficulty(26)}
            style={
              uniqueRandomNumbers.length === 26
                ? { textDecoration: "underline" }
                : { textDecoration: "none" }
            }
          >
            Hard
          </li>
        </ul>
        <button className="refresh" onClick={reloadgame}>
          New Game
        </button>
      </nav>
      <Suduko randomnumbers={uniqueRandomNumbers} />
    </div>
  );
}

export default App;
