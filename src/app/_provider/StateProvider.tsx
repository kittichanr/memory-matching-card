"use client";

import React, { createContext, useState } from "react";

export type State = "start" | "playing" | "score";

const StateContext = createContext({
  state: "start",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateState: (_type: State) => {},
  playerName: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updatePlayerName: (_name: string) => {},
});

function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("start");
  const [name, setName] = useState("");

  const updateState = (type: State) => {
    setState(type);
  };

  const updatePlayerName = (name: string) => {
    setName(name);
  };

  return (
    <StateContext.Provider
      value={{ state, updateState, updatePlayerName, playerName: name }}
    >
      {children}
    </StateContext.Provider>
  );
}

export { StateProvider, StateContext };
