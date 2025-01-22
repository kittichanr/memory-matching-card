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
  getScore: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        pageSize: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;
      const skip = (page - 1) * pageSize;

      const scores = await ctx.db.score.findMany({
        skip,
        take: pageSize,
        orderBy: {
          score: "asc",
        },
      });

      const totalScores = await ctx.db.score.count(); // For total count

      return {
        scores,
        totalScores,
      };
    }),
});
