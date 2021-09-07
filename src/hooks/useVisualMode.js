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
  };

  const back = () => {
    //console.log("....back", mode, history);
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
  };
  return { mode, transition, back };
};

export default useVisualMode;
