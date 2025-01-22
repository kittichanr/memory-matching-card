"use client";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../_provider/StateProvider";
import { api } from "~/trpc/react";

interface Props {
  playerName: string;
}

interface Card {
  index: number | null;
  value: number | null;
}

const defaultState = { index: null, value: null };

export function MatchCard({ playerName }: Props) {
  const { data, isLoading } = api.card.getCards.useQuery();
  const { mutate } = api.card.saveScore.useMutation();

  const { updateState } = useContext(StateContext);

  const [firstCard, setFirstCard] = useState<Card>(defaultState);
  const [secondCard, setSecondCard] = useState<Card>(defaultState);
  const [remainingCards, setRemainingCards] = useState(data?.remainingCards);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (data?.remainingCards) {
      setRemainingCards(data?.remainingCards);
    }
  }, [data?.remainingCards]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (index: number, value: number) => {
    clearTimeout(timer.current!);

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

      timer.current = setTimeout(() => {
        setFirstCard(defaultState);
        setSecondCard(defaultState);
      }, 1000);

      if (firstCard.value === value) {
        setRemainingCards(
          remainingCards?.filter((card) => card.value !== value),
        );
      }
    }
  };

  const handlePlayAgain = () => {
    mutate({ name: playerName, score: moves });
    updateState("start");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        Name: <span className="mb-8 text-3xl">{playerName}</span>
      </div>
      <div className="flex flex-row items-center justify-center">
        {remainingCards && remainingCards?.length > 0
          ? `Remaining cards: `
          : "Victory!"}
        {remainingCards?.map((item, index) => {
          return (
            <Image
              key={index}
              width={40}
              height={40}
              alt={`image ${index}`}
              src={`${item.url}&size=40x40`}
            />
          );
        })}
      </div>
      <div className="my-4 grid grid-cols-5 justify-center gap-2">
        {data?.cards?.map((item, index) => {
          return (
            <div
              key={index}
              className={`card h-24 w-20 md:h-52 md:w-36 ${
                (firstCard.index === index ||
                  secondCard.index === index ||
                  !remainingCards?.find((card) => card.value === item.value)) &&
                "flipped"
              }`}
              onClick={() => handleClick(index, item.value)}
            >
              <div className="backSide"></div>
              <Image
                alt={`image ${index}`}
                src={`${item.url}&size=120x120`}
                width={120}
                height={120}
              />
            </div>
          );
        })}
      </div>
      <div>Moves used: {moves}</div>
      {remainingCards && remainingCards.length === 0 && (
        <div className="flex items-center justify-center">
          <button
            className="rounded-full bg-blue-500 px-10 py-3 font-semibold text-white"
            onClick={handlePlayAgain}
          >
            Play again
          </button>
        </div>
      )}
    </>
  );
}
