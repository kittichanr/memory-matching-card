import { get } from "http";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import shuffle from "~/utils/shuffle";

export const cardRouter = createTRPCRouter({
  getCards: publicProcedure.query(({}) => {
    const items = [1, 2, 3, 4, 5];
    const randomSet = Math.floor(Math.random() * 4);

    const allItems = shuffle([...items, ...items]).map((value) => ({
      value: value,
      url: `https://robohash.org/${value}?set=set${randomSet})}`,
    }));

    const remainingCards = shuffle([...items]).map((value) => ({
      value: value,
      url: `https://robohash.org/${value}?set=set${randomSet})}`,
    }));

    return {
      cards: allItems,
      remainingCards,
    };
  }),
  saveScore: publicProcedure
    .input(z.object({ name: z.string().min(1), score: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.score.create({
        data: {
          name: input.name,
          score: input.score,
        },
      });
    }),
  // getScore: publicProcedure,
});
