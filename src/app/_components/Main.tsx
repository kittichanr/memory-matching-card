"use client";

import { useContext } from "react";

import { StateContext } from "../_provider/StateProvider";
import { EnterName } from "./EnterName";
import { MatchCard } from "./MatchCard";

export function Main() {
  const { playerName, state } = useContext(StateContext);

  const renderState = () => {
    switch (state) {
      case "start":
        return <EnterName />;
      case "playing":
        return <MatchCard playerName={playerName} />;
      case "end":
        return <div>End</div>;
    }
  };

  return <div className="w-full max-w-xs">{renderState()}</div>;
}
