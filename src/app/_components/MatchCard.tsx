"use client";

import { useEffect } from "react";

interface Props {
  playerName: string;
}

export function MatchCard({ playerName }: Props) {
  useEffect(() => {
    console.log("test1");
  }, []);

  return (
    <div>
      <div>Hello: {playerName}</div>
    </div>
  );
}
