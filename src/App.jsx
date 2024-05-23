import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [display, setDisplay] = useState("0");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const formatNumber = (num) => {
    const rounded = Math.round(num * 10000) / 10000;
    if (rounded % 1 === 0) {
      return String(rounded);
    } else {
      const withFourDecimals = rounded.toFixed(4);
      return parseFloat(withFourDecimals).toString();
    }
  };

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else if (display.length < 12) {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const toggleSign = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(currentValue * -1));
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay(".");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1 && display.length < 12) {
      setDisplay(display + ".");
    }
  };

  const inputOperator = (op) => {
    const inputValue = parseFloat(display);

    if (value == null) {
      setValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const currentValue = value || 0;
      const newValue = performOperation[operator](currentValue, inputValue);

      setValue(newValue);
      setDisplay(formatNumber(newValue));
    }

    setWaitingForOperand(true);
    setOperator(op);
  };

  const performOperation = {
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  };

  const calculate = () => {
    let result = parseFloat(display);
    if (operator !== null && value !== null) {
      result = performOperation[operator](value, parseFloat(display));
      setOperator(null);
    }
    setDisplay(formatNumber(result));
    setValue(null);
    setWaitingForOperand(true);
  };

  const clearDisplay = () => {
    setDisplay("0");
    setWaitingForOperand(false);
    setOperator(null);
    setValue(null);
  };

  const deleteLastChar = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen transition-colors duration-300 ease-in-out ${
        darkMode ? "bg-indigo-900" : "bg-gray-100"
      }`}
    >
      <button
        className={`${darkMode ? "text-orange-600" : "text-yellow-400"} p-5`}
      >
        <FontAwesomeIcon
          icon={darkMode ? faSun : faMoon}
          onClick={() => setDarkMode(!darkMode)}
          size="2xl"
        />
      </button>
      <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="w-full flex justify-end mb-4">
          <output
            id="display"
            className="p-3 text-center text-2xl font-bold bg-gray-200 rounded"
          >
            {display}
          </output>
        </div>
        <div className="mb-2 flex items-center gap-1">
          <button
            id="clear"
            className="w-full py-2 px-3 text-white bg-red-500 rounded hover:bg-red-700"
            onClick={clearDisplay}
          >
            AC
          </button>
          <button
            id="toggleSign"
            className="w-full py-2 px-3 text-white bg-orange-500 rounded hover:bg-red-700"
            onClick={toggleSign}
          >
            +/-
          </button>
        </div>
        <div className="mb-2 grid grid-cols-4 gap-2">
          <button
            id="seven"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("7")}
          >
            7
          </button>
          <button
            id="eight"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("8")}
          >
            8
          </button>
          <button
            id="nine"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("9")}
          >
            9
          </button>
          <button
            id="divide"
            className="py-2 px-3 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => inputOperator("/")}
          >
            /
          </button>
        </div>
        <div className="mb-2 grid grid-cols-4 gap-2">
          <button
            id="four"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("4")}
          >
            4
          </button>
          <button
            id="five"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("5")}
          >
            5
          </button>
          <button
            id="six"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("6")}
          >
            6
          </button>
          <button
            id="multiply"
            className="py-2 px-3 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => inputOperator("*")}
          >
            *
          </button>
        </div>
        <div className="mb-2 grid grid-cols-4 gap-2">
          <button
            id="one"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("1")}
          >
            1
          </button>
          <button
            id="two"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("2")}
          >
            2
          </button>
          <button
            id="three"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("3")}
          >
            3
          </button>
          <button
            id="subtract"
            className="py-2 px-3 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => inputOperator("-")}
          >
            -
          </button>
        </div>
        <div className="mb-2 grid grid-cols-4 gap-2">
          <button
            id="zero"
            className="col-span-2 py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => inputNumber("0")}
          >
            0
          </button>
          <button
            id="decimal"
            className="py-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={inputDecimal}
          >
            .
          </button>
          <button
            id="add"
            className="py-2 px-3 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => inputOperator("+")}
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            id="delete"
            className="py-2 px-3 text-white bg-yellow-500 rounded hover:bg-yellow-700"
            onClick={deleteLastChar}
          >
            <FontAwesomeIcon icon={faBackspace} />
          </button>
          <button
            id="equals"
            className="col-span-3 py-2 px-3 text-white bg-green-500 rounded hover:bg-green-700"
            onClick={calculate}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
