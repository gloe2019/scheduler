import { useState } from "react";
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
    //history.push(mode) -- don't edit your state directly -- change history through setHistory
    console.log("-----Transition\n", "mode", mode, "history", history);
  };

  const back = () => {
    console.log("....back", mode, history);
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
  };
  return { mode, transition, back };

  //another way to do this: take a slice of history -- slice from last - 1
};

export default useVisualMode;
