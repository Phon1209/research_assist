import { useReducer } from "react";

const ACTIONS = {
  KEYDOWN: "KEYDOWN",
  KEYUP: "KEYUP",
};

const init = {
  time: new Date().getTime(),
  stroke: [],
};

const reduceFunction = (state, action) => {
  const newTime = new Date().getTime();
  switch (action.type) {
    case ACTIONS.KEYDOWN:
      return {
        stroke: [
          ...state.stroke,
          { char: "delay", time: newTime - state.time },
        ],
        time: newTime,
      };
    case ACTIONS.KEYUP:
      return {
        stroke: [
          ...state.stroke,
          { char: action.payload, time: newTime - state.time },
        ],
        time: newTime,
      };
    default:
      return state;
  }
};

export default function KeystrokeTimer() {
  const [state, dispatch] = useReducer(reduceFunction, init);

  function captureKeyDown(e) {
    dispatch({ type: ACTIONS.KEYDOWN, payload: "" });
  }

  function capturekeyUp(e) {
    const lastLetter = e.target.value.slice(-1);
    console.log(lastLetter);
    dispatch({ type: ACTIONS.KEYUP, payload: lastLetter });
  }

  return (
    <div>
      <input type="text" onKeyDown={captureKeyDown} onKeyUp={capturekeyUp} />
      <ul>
        {state.stroke.map((stroke) => {
          return (
            <li>
              {stroke.char} : {stroke.time}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
