import { useState, useEffect, useRef } from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [numbers, setNumbers] = useState(() => newDice());
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let isWon = false;
  if (
    numbers.every(
      (number) => number.isHeld && number.value === numbers[0].value
    )
  ) {
    isWon = true;
  }

  function newDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 10),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (isWon === false) {
      setNumbers((prevNumbers) => {
        return prevNumbers.map((prev) => {
          return prev.isHeld
            ? prev
            : { ...prev, value: Math.ceil(Math.random() * 10) };
        });
      });
    } else {
      setNumbers(() => newDice());
      isWon = false;
    }
  }

  const newGameButton = useRef(null);
  useEffect(() => {
    if (isWon === true) {
      newGameButton.current.focus();
    }
  }, [isWon]);

  function holdDie(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((die, i) =>
        id === i ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  return (
    <main>
      <div aria-live="polite" className="sr-only">
        {isWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      {isWon ? (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          initialVelocityY={50}
        />
      ) : null}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {numbers.map((number, i) => (
          <Die
            style={{ backgroundColor: number.isHeld ? "green" : "white" }}
            holdDie={holdDie}
            id={i}
            key={i}
            value={number.value}
          />
        ))}
      </div>
      <button ref={newGameButton} className="roll-dice" onClick={rollDice}>
        {isWon === true ? "New game?" : "Roll"}
      </button>
    </main>
  );
}

export default App;
