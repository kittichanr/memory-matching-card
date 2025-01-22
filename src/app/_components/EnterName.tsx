"use client";

import { useContext, useState } from "react";

import { StateContext } from "../_provider/StateProvider";

export function EnterName() {
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
        <button
          type="submit"
          className={`rounded-full bg-white/10 px-10 py-3 font-semibold transition ${
            name.length === 0
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-700"
          } `}
          disabled={name.length === 0}
        >
          Start
        </button>
      </form>
    </div>
  );
}
