import { useEffect, useReducer, useRef } from "react";

// const alpha = Array.from(Array(26)).map((e, i) => i + 97);
// const alphabet = alpha.map((x) => String.fromCharCode(x));

// const pair = alphabet.reduce((acc, alp) => {
//   const p = alphabet.reduce((acc, blp) => {
//     return [...acc, alp + blp];
//   }, []);
//   return [...acc, ...p];
// }, []);

const tests = [
  "for",
  "people",
  "to",
  "get",
  "upset",
  "but",
  "she",
  "knew",
  "that",
  "whatever",
  "decision",
  "she",
  "made",
  "it",
  "would",
  "upset",
  "someone",
  "it",
  "seemed",
  "like",
  "such",
  "silly",
  "reason",
  "was",
  "no",
  "way",
  "everyone",
  "in",
  "her",
  "life",
  "would",
  "she",
  "knew",
  "consider",
  "doing",
  "it",
  "that",
  "there",
  "mary",
  "had",
  "to",
  "make",
  "decision",
  "and",
  "be",
  "pleased",
  "with",
  "what",
  "please",
  "the",
  "most",
  "with",
  "her",
  "decision",
  "was",
  "herself",
  "the",
  "she",
  "ultimately",
  "decided",
  "to",
  "do",
  "it",
  "was",
  "time",
  "simply",
  "question",
  "of",
  "who",
  "she",
  "would",
  "rather",
  "displease",
  "most",
  "while",
  "this",
  "had",
  "decided",
  "that",
  "this",
  "the",
  "person",
  "she",
  "was",
  "her",
  "parents",
  "and",
  "especially",
  "her",
  "mom",
  "in",
  "the",
  "past",
  "always",
  "been",
  "tried",
  "to",
  "keep",
  "from",
  "upsetting",
  "she",

  "that",
  "she",

  "going",
  "to",
  "minute",
  "that",
  "she",
  "began",
  "to",
];

const ACTIONS = {
  KEYDOWN: "KEYDOWN",
  KEYUP: "KEYUP",
  NEXT: "NEXT",
};

const init = {
  ind: -1,
  expect: "",
  time: new Date().getTime(),
  stroke: "",
};

const reduceFunction = (state, action) => {
  const newTime = new Date().getTime();
  switch (action.type) {
    case ACTIONS.KEYDOWN:
      return {
        ...state,
        time: newTime,
      };
    case ACTIONS.KEYUP:
      return {
        ...state,
        stroke: state.stroke + action.payload,
        time: newTime,
      };
    case ACTIONS.NEXT:
      const oldIndex = state.ind;
      return {
        ...state,
        stroke: "",
        expect: tests[oldIndex + 1],
        ind: oldIndex + 1,
      };
    default:
      return state;
  }
};

export default function KeyFiller() {
  const [state, dispatch] = useReducer(reduceFunction, init);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current.value === state.expect) {
      dispatch({ type: ACTIONS.NEXT });
      inputRef.current.value = "";
    }
  }, [state.stroke]);

  function captureKeyDown(e) {
    dispatch({ type: ACTIONS.KEYDOWN, payload: "" });
  }

  function capturekeyUp(e) {
    const lastLetter = e.target.value.slice(-1);
    dispatch({ type: ACTIONS.KEYUP, payload: lastLetter });
  }

  return (
    <div className="grid grid-flow-row min-h-screen">
      <h1 className="bg-sky-100 text-6xl text-center p-6">{state.expect}</h1>
      <div className="flex items-center justify-center">
        <input
          className="border-blue-400 border-2"
          ref={inputRef}
          type="text"
          onKeyDown={captureKeyDown}
          onKeyUp={capturekeyUp}
        />
      </div>
    </div>
  );
}
