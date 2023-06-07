import React, { useRef, useState } from "react";
import "../App.css";
import Scorecard from "./Scorecard";
import sudoku from "./suduko_generator";
//import { randomnumbers } from "./random_numbers";
//import randomnumbers from "./random_numbers";
const Suduko = ({randomnumbers}) => {
  const win = 81 - randomnumbers.length;
  const [message, setMessage] = useState("Sorry, You Lost!");
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(5);
  const ref = useRef(null);
  const ref2 = useRef(null);
  //const [success, setSuccess] = useState(false);
  //console.log(randomnumbers);
  
  const [selectedCell, setSelectedCell] = useState(null);
  const ref3 = useRef([]);
  // const enterKeyEvent = new KeyboardEvent("keydown", {
  //   key: "Enter",
  //   code: "Enter",
  //   keyCode: 13,
  //   which: 13,
  // });
  const [clr, setclr] = useState("red");
  const handleKeyDown = () => {
    // const keyCode = event.keyCode || event.which;
    // if (keyCode === 13) {
    //event.preventDefault(); // Prevent form submission
    const inputValue = ref3.current[selectedCell].value;
    if (inputValue !== "") {
      const cell = selectedCell;
      const r = Math.floor(cell / 9);
      const c = Math.floor(cell % 9);
      if (sudoku[r][c] === parseInt(inputValue)) {
        if (ref3.current[selectedCell].style.backgroundColor !== "green") {
          setScore((prevScore) => prevScore + 1);

          ref3.current[selectedCell].style.backgroundColor = "green";
        }
        ref3.current[selectedCell].style.backgroundColor = "green";
        if (score === win) {
          ref.current.click();
          setclr("green");
          setMessage("Congratulations, You Won!");
        }
      } else {
        setLife((prevLife) => prevLife - 1);
        //console.log(life);
        if (ref3.current[selectedCell].style.backgroundColor === "green") {
          let prev = score - 1;
          setScore(prev);
        }
        ref3.current[selectedCell].style.backgroundColor = "red";
        if (life === 1) {
          ref.current.click();
          setclr("red");
          setMessage("Sorry, You Lost!");
        }
      }
    }
  };

  const handlenewGame = () => {
    ref2.current.click();
    window.location.reload();
  };
  // const [Mynumber, setMynumber] = useState("");

  const handleNumClick = (event) => {
    if (selectedCell !== null) {
      //setMynumber(event.target.id);
      ref3.current[selectedCell].value = event.target.id;
      handleKeyDown();
      //ref3.current[selectedCell].dispatchEvent(enterKeyEvent);
    }
  };
  //console.log(selectedCell);
  const handleOnFocus = (event) => {
    setSelectedCell(event.target.id);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
        ref={ref}
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="staticBackdropLabel"
                style={{ color: `${clr}` }}
              >
                {message}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={ref2}
                style={{ display: "none" }}
              ></button>
            </div>
            <div className="modal-body">Click below for a new game</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlenewGame}
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="game">
        <div className="game_elements">
          <Scorecard life={life} />
          <div className="gamestatus">
            {life === 0
              ? "YOU LOST"
              : `${score === win ? "YOU WON" : `${win - score} Blocks Left`}`}
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              {sudoku[0].map((element, index) => {
                const elementIndex = index;
                const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      r1 % 3 === 2 || c1 % 3 === 2
                        ? { borderRight: "5px solid", borderTop: "5px solid" }
                        : { borderTop: "5px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[1].map((element, index) => {
                const elementIndex = index + 9;
                //const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      c1 % 3 === 2
                        ? { borderRight: "5px solid" }
                        : { border: "2px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[2].map((element, index) => {
                const elementIndex = index + 18;
                const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      r1 % 3 === 2 && c1 % 3 === 2
                        ? {
                            borderRight: "5px solid",
                            borderBottom: "5px solid",
                          }
                        : { borderBottom: "5px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[3].map((element, index) => {
                const elementIndex = index + 27;
                //const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      c1 % 3 === 2
                        ? { borderRight: "5px solid" }
                        : { border: "2px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[4].map((element, index) => {
                const elementIndex = index + 36;
                // const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      c1 % 3 === 2
                        ? { borderRight: "5px solid" }
                        : { border: "2px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[5].map((element, index) => {
                const elementIndex = index + 45;
                const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      r1 % 3 === 2 && c1 % 3 === 2
                        ? {
                            borderRight: "5px solid",
                            borderBottom: "5px solid",
                          }
                        : { borderBottom: "5px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[6].map((element, index) => {
                const elementIndex = index + 54;
                //const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      c1 % 3 === 2
                        ? { borderRight: "5px solid" }
                        : { border: "2px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[7].map((element, index) => {
                const elementIndex = index + 63;
                //const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      c1 % 3 === 2
                        ? { borderRight: "5px solid" }
                        : { border: "2px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {sudoku[8].map((element, index) => {
                const elementIndex = index + 72;
                const r1 = Math.floor(elementIndex / 9);
                const c1 = Math.floor(elementIndex % 9);
                return (
                  <td
                    className="highlight"
                    key={elementIndex}
                    style={
                      r1 % 3 === 2 && c1 % 3 === 2
                        ? {
                            borderRight: "5px solid",
                            borderBottom: "5px solid",
                          }
                        : { borderBottom: "5px solid" }
                    }
                  >
                    {randomnumbers.includes(elementIndex) ? (
                      element
                    ) : (
                      <input
                        id={elementIndex}
                        ref={(ref) => (ref3.current[elementIndex] = ref)}
                        type="text"
                        className="my_input"
                        onBlur={handleKeyDown}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleKeyDown(event);
                          }
                        }}
                        autoComplete="off"
                        onClick={handleOnFocus}
                      ></input>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <div className="numpad">
          <div className="numElements" id="1" onClick={handleNumClick}>
            1
          </div>
          <div className="numElements" id="2" onClick={handleNumClick}>
            2
          </div>
          <div className="numElements" id="3" onClick={handleNumClick}>
            3
          </div>
          <div className="numElements" id="4" onClick={handleNumClick}>
            4
          </div>
          <div className="numElements" id="5" onClick={handleNumClick}>
            5
          </div>
          <div className="numElements" id="6" onClick={handleNumClick}>
            6
          </div>
          <div className="numElements" id="7" onClick={handleNumClick}>
            7
          </div>
          <div className="numElements" id="8" onClick={handleNumClick}>
            8
          </div>
          <div className="numElements" id="9" onClick={handleNumClick}>
            9
          </div>
        </div>
      </div>
    </>
  );
};

export default Suduko;
