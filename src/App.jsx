import { useState } from "react";
import Die from "./components/Die";
function App() {
  const [numbers, setNumbers] = useState(newDice());

  function newDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 10),
      isHeld: false,
    }));
  }

  function rollDice() {
    setNumbers((prevNumbers) => {
      return prevNumbers.map((prev) => {
        return prev.isHeld
          ? prev
          : { ...prev, value: Math.ceil(Math.random() * 10) };
      });
    });
  }

  function holdDie(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((die, i) =>
        id === i ? { ...die, isHeld: !die.isHeld } : die
      )
    );
    console.log(numbers[id]);
  }

  return (
    <main>
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
      <button className="roll" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
