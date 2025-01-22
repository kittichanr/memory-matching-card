"use client";

import Image from "next/image";
import { useContext, useRef, useState } from "react";
import shuffle from "~/utils/shuffle";
import { StateContext } from "../_provider/StateProvider";

interface Props {
  playerName: string;
}

interface Card {
  index: number | null;
  value: number | null;
}

const items = [1, 2, 3, 4, 5];
const allItems = shuffle([...items, ...items]);
const defaultState = { index: null, value: null };

export function MatchCard({ playerName }: Props) {
  const { updateState } = useContext(StateContext);

  const [firstCard, setFirstCard] = useState<Card>(defaultState);
  const [secondCard, setSecondCard] = useState<Card>(defaultState);
  const [remainingCards, setRemainingCards] = useState(items);
  const [moves, setMoves] = useState(0);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (index: number, value: number) => {
    clearTimeout(timer.current!);

    timer.current = setTimeout(() => {
      setFirstCard(defaultState);
      setSecondCard(defaultState);
    }, 1500);

    if (
      firstCard.index === null ||
      (firstCard.index !== null && secondCard.index !== null)
    ) {
      setSecondCard(defaultState);
      setFirstCard({ index, value });
      setMoves((moves) => moves + 1);
    } else if (secondCard.index === null && firstCard.index !== index) {
      setSecondCard({ index, value });
      setMoves((moves) => moves + 1);

      if (firstCard.value === value) {
        setRemainingCards(remainingCards.filter((card) => card !== value));
      }
    }
  };

  const handlePlayAgain = () => {
    updateState("start");
    // TODO: save score
  };

  return (
    <>
      <div>
        Name: <span className="mb-8 text-3xl">{playerName}</span>
      </div>
      <div className="flex flex-row items-center justify-center">
        {remainingCards.length > 0 ? `Remaining cards: ` : "Victory!"}
        {remainingCards.map((card, index) => {
          return (
            <Image
              key={index}
              width={40}
              height={40}
              alt={`image ${index}`}
              src={`https://robohash.org/${card}?set=set4&&size=40x40`}
            />
          );
        })}
      </div>
      <div className="my-4 grid grid-cols-5 justify-center gap-2">
        {allItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`card h-24 w-20 md:h-52 md:w-36 ${
                (firstCard.index === index ||
                  secondCard.index === index ||
                  !remainingCards.includes(item)) &&
                "flipped"
              }`}
              onClick={() => handleClick(index, item)}
            >
              <div className="backSide"></div>
              <Image
                alt={`image ${index}`}
                src={`https://robohash.org/${item}?set=set4&&size=120x120`}
                width={120}
                height={120}
              />
            </div>
          );
        })}
      </div>
      Moves used: {moves}
      {remainingCards.length === 0 && (
        <button onClick={handlePlayAgain}>Play again</button>
      )}
    </>
  );
}
