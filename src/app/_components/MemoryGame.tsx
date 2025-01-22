"use client";

import { useContext } from "react";

import { StateContext } from "../_provider/StateProvider";
import { Start } from "./Start";
import { MatchCard } from "./MatchCard";

export function MemoryGame() {
  const { playerName, state } = useContext(StateContext);

  const renderState = () => {
    switch (state) {
      case "start":
        return <Start />;
      case "playing":
        return <MatchCard playerName={playerName} />;
      case "score":
        return <div>End</div>;
    }
  };

  return <div>{renderState()}</div>;
}
