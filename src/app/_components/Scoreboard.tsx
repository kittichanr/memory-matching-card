"use client";

import { useContext } from "react";

import { StateContext } from "../_provider/StateProvider";

export function Scoreboard() {
  const { updateState } = useContext(StateContext);

  return (
    <div className="w-full max-w-xs">
      <button
        className="rounded-full bg-blue-500 px-10 py-3 font-semibold text-white"
        onClick={() => updateState("start")}
      >
        Go back
      </button>
    </div>
  );
}
