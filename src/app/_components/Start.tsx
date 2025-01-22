"use client";

import { useContext, useState } from "react";

import { StateContext } from "../_provider/StateProvider";

export function Start() {
  const [name, setName] = useState("");

  const { updateState, updatePlayerName } = useContext(StateContext);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateState("playing");
          updatePlayerName(name);
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <div className="flex flex-row">
          <button
            type="submit"
            className={`rounded-full bg-white/10 px-10 py-3 font-semibold transition ${
              name.length === 0
                ? "bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-700"
            } `}
            disabled={name.length === 0}
          >
            Play
          </button>
          <button
            className="rounded-full bg-blue-500 px-10 py-3 font-semibold text-white"
            onClick={() => updateState("score")}
          >
            Scoreboard
          </button>
        </div>
      </form>
    </div>
  );
}
